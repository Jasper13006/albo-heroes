import axios from 'axios'
import * as admin from 'firebase-admin';
import db from '../../../database';
import config from '../../../config'
import { hasher } from '../../../utils/index';

if (!config.PRIVATE_KEY || !config.PUBLIC_KEY) {
    throw new Error(`Nonexistent marvel credentials`)
}
const ts: number = Date.now()
const hash: string = hasher([String(ts), config.PRIVATE_KEY, config.PUBLIC_KEY])
const auth: string = `apikey=${config.PUBLIC_KEY}&ts=${ts}&hash=${hash}`

const createRequestCollection = async (characterId: number) => {
    const comicsResponse = await axios.get(`${config.MARVEL_API}/characters/${characterId}/comics?limit=1&${auth}`)
    const nPages: number = Math.ceil(comicsResponse.data.data.total / 100)
    const arrayOfRequests = [...Array(1).keys()].map((e: number) => {
        const skipAndLimit = `limit=100&offset=${100 * e}`
        const url = `${config.MARVEL_API}/characters/${characterId}/comics?${skipAndLimit}&${auth}`
        return createRequestPromise(url)
    })

    return arrayOfRequests;
}

const createRequestPromise = (url: string) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            const comicResponse = await axios.get(url)
            const results = comicResponse.data.data.results
            const finallyResult = cleanComics(results)
            resolve(finallyResult)
        } catch (err) {
            reject(err)
        }
    })
    return promise
}

const cleanComics = (results: any) => {
    const writers = new Set()
    const editors = new Set()
    const colorists = new Set()
    let charactersToSend: any[] = []

    results.forEach((element: any) => {
        const { id, title, creators, characters } = element
        creators.items.forEach((e: any) => {
            if (e.role === 'editor') editors.add(e.name)
            if (e.role === 'writer') writers.add(e.name)
            if (e.role === 'colorist') colorists.add(e.name)
        });
        characters.items.forEach((character: any) => {
            const { name, resourceURI } = character
            const idCharacter = resourceURI.split('/').pop()
            charactersToSend.push({
                name,
                id: idCharacter,
                comics: [title]
            })
        })
    });
    console.log(charactersToSend)
}
export const getInformationOfCharacter = async (characterName: string): Promise<void> => {
    const last_sync = new Date()

    const characterResponse = await axios.get(`${config.MARVEL_API}/characters?name=Iron%20Man&${auth}`)
    const { name, id } = characterResponse.data.data.results[0]
    const promises = await createRequestCollection(id)

    console.time("axiosResolve")
    const promisesResolves = await Promise.all(promises)
    console.timeEnd("axiosResolve")
    console.log("FINISH")
    //comprobar si el caracter existe en db

    // console.log(id)
    // let characterRef = db.collection('character').doc(`${id}`);
    // let character = await characterRef.get()

    // if (!character.exists) {
    // const dataToCreate = {
    // name,
    // id,
    // last_sync,
    // colaborators:{ writers:[], editors:[], colorists:[] }
    // }
    // const newcharacter = await characterRef.set(dataToCreate)
    // }
    // const comicsResponse = await axios.get(`${config.MARVEL_API}/characters/1009368/comics?limit=1&${auth}`)

    return
}

