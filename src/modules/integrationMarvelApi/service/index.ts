import axios from 'axios'
import config from '../../../config'
import { hasher,availableCaracters } from '../../../utils/index';
import { IpageOfComics, ICharacterNested, ICharacter } from '../../../interface';
import * as repository from '../repository/index'

if (!config.PRIVATE_KEY || !config.PUBLIC_KEY) {
    throw new Error(`Nonexistent marvel credentials`)
}
const ts: number = Date.now()
const hash: string = hasher([String(ts), config.PRIVATE_KEY, config.PUBLIC_KEY])
const auth: string = `apikey=${config.PUBLIC_KEY}&ts=${ts}&hash=${hash}`
//a grego el nuevo home
export const createCharacterInDatabase = async (characterName: string): Promise<void> => {
    try{
        console.time(`Character ${characterName} populated in:`)
        const last_sync = new Date();

    const characterNameForRequest = availableCaracters[characterName]
    const characterResponse = await axios.get(`${config.MARVEL_API}/characters?name=${characterNameForRequest}&${auth}`);

    const { name, id } = characterResponse.data.data.results[0];

    const promises = await createRequestCollection(id);
    const promisesResolves = await Promise.all(promises);

    //* merge all pages
    const allInfoOfCharacter = mergeAllPages(promisesResolves)

    const dataToSend: ICharacter = {
        alboName:characterName,
        last_sync,
        name,
        id,
        characters: allInfoOfCharacter.characters,
        colaborators: {
            writers: allInfoOfCharacter.writers,
            editors: allInfoOfCharacter.editors,
            colorists: allInfoOfCharacter.colorists,
        }
    }
    await repository.createOrUpdate(dataToSend)
    console.timeEnd(`Character ${characterName} populated in:`)
    }catch(err){
        console.error(err)
    }
}

const mergeAllPages = (pagesOfComics: IpageOfComics[]): IpageOfComics => {
    const mergedPages = pagesOfComics.reduce((allPages, nextPage): IpageOfComics => {
        return {
            writers: [...allPages.writers, ...nextPage.writers],
            editors: [...allPages.editors, ...nextPage.editors],
            colorists: [...allPages.colorists, ...nextPage.colorists],
            characters: [...allPages.characters, ...nextPage.characters],
        }
    })
    const writers: Set<string> = new Set(mergedPages.writers)
    const editors: Set<string> = new Set(mergedPages.editors)
    const colorists: Set<string> = new Set(mergedPages.colorists)
    const characters = mergedCharacterNested(mergedPages.characters)
    return {
        characters: characters,
        writers: [...writers],
        editors: [...editors],
        colorists: [...colorists],
    }
}

const mergedCharacterNested = (characters: ICharacterNested[]): ICharacterNested[] => {
    const characterIndex: { [key: string]: ICharacterNested } | any = {}
    characters.forEach((characterNested: ICharacterNested) => {
        const { character, id, comics } = characterNested
        if (!characterIndex[`${id}`]) {
            characterIndex[`${id}`] = {
                character,
                comics,
                id
            }
        } else {
            characterIndex[`${id}`]['comics'] = [...characterIndex[`${id}`]['comics'], ...comics]
        }
    })
    const response: ICharacterNested[] = Object.values(characterIndex)
    return response

}

const createRequestCollection = async (characterId: number) => {
    const comicsResponse = await axios.get(`${config.MARVEL_API}/characters/${characterId}/comics?limit=1&${auth}`)
    const nPages: number = Math.ceil(comicsResponse.data.data.total / 100)
    const arrayOfRequests = [...Array(nPages).keys()].map((e: number) => {
        const skipAndLimit = `limit=100&offset=${100 * e}`
        const url = `${config.MARVEL_API}/characters/${characterId}/comics?${skipAndLimit}&${auth}`
        return createRequestPromise(url)
    })
    return arrayOfRequests;
}

const createRequestPromise = (url: string): Promise<IpageOfComics> => {
    let promise: Promise<IpageOfComics> = new Promise(async (resolve, reject) => {
        try {
            const comicResponse = await axios.get(url)
            const results = comicResponse.data.data.results
            const finallyResult = cleanOnePageOfComics(results)
            resolve(finallyResult)
        } catch (err) {
            reject(err)
        }
    })
    return promise
}

const cleanOnePageOfComics = (results: any): IpageOfComics => {
    const writers: Set<string> = new Set()
    const editors: Set<string> = new Set()
    const colorists: Set<string> = new Set()
    let charactersToSend: any[] = []

    results.forEach((element: any) => {
        const { title, creators, characters } = element
        creators.items.forEach((e: any) => {
            if (e.role === 'editor') editors.add(String(e.name))
            if (e.role === 'writer') writers.add(String(e.name))
            if (e.role === 'colorist') colorists.add(String(e.name))
        });
        characters.items.forEach((character: any) => {
            const { name, resourceURI } = character
            const idCharacter = resourceURI.split('/').pop()
            charactersToSend.push({
                character: name,
                id: idCharacter,
                comics: [title]
            })
        })
    });
    const pageOfComics = {
        writers: [...writers],
        editors: [...editors],
        colorists: [...colorists],
        characters: charactersToSend
    }
    return pageOfComics
}
