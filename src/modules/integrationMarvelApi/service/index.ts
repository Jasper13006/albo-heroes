import axios from 'axios'
import config from '../../../config'
import hasher from '../../../utils/hasher';

export const getInformationOfCharacter = async (characterName:string): Promise<void> => {
    if(!config.PRIVATE_KEY || !config.PUBLIC_KEY){
        throw new Error(`Nonexistent marvel credentials`)
    }
    const ts: number = Date.now()
    const hash: string = hasher([String(ts),config.PRIVATE_KEY,config.PUBLIC_KEY])
    const auth: string = `apikey=${config.PUBLIC_KEY}&ts=${ts}&hash=${hash}`

    const characterResponse = 

    // const comicsResponse = await axios.get(`${config.MARVEL_API}/characters/1009368/comics?limit=5&${auth}`)

    // comicsResponse.data.data.results.forEach((element: any) => {
    //     const { id, title, creators, characters } = element
    //     console.log({id,title,creators,characters})
    // });
    return
}

