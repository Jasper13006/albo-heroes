import axios from 'axios'
import * as admin from 'firebase-admin';
import db from '../../../database';
import config from '../../../config'
import {hasher,makeChunks} from '../../../utils/index';

//generar creador de peticiones a la api
//probar que le pueda pegar la cantidad de peticiones necesarias
//crear promesa depuradora
//la promesa tiene que pegarle al endpoint, tratar primeramente los datos y devolverlos como un objeto
if (!config.PRIVATE_KEY || !config.PUBLIC_KEY) {
    throw new Error(`Nonexistent marvel credentials`)
}
const ts: number = Date.now()
const hash: string = hasher([String(ts), config.PRIVATE_KEY, config.PUBLIC_KEY])
const auth: string = `apikey=${config.PUBLIC_KEY}&ts=${ts}&hash=${hash}`

const generateMarvelApiRequest = async(characterId:number)=>{
    const comicsResponse = await axios.get(`${config.MARVEL_API}/characters/${characterId}/comics?limit=1&${auth}`)
    const nPages:number = Math.ceil(comicsResponse.data.data.total/100)
    const arrayOfRequests = [...Array(2).keys()].map((e:number)=>{
        const skipAndLimit = `limit=100&offset=${100*e}`
        return axios.get(`${config.MARVEL_API}/characters/${characterId}/comics?${skipAndLimit}&${auth}`)
    })

    const chunks = makeChunks(arrayOfRequests,2)
    console.log(chunks)
    return arrayOfRequests;
}
  


export const getInformationOfCharacter = async (characterName: string): Promise<void> => {
    if (!config.PRIVATE_KEY || !config.PUBLIC_KEY) {
        throw new Error(`Nonexistent marvel credentials`)
    }
    // const ts: number = Date.now()
    // const hash: string = hasher([String(ts), config.PRIVATE_KEY, config.PUBLIC_KEY])
    // const auth: string = `apikey=${config.PUBLIC_KEY}&ts=${ts}&hash=${hash}`

    const last_sync = new Date()

    const characterResponse = await axios.get(`${config.MARVEL_API}/characters?name=Iron%20Man&${auth}`)
    const { name, id } = characterResponse.data.data.results[0]
    const promises = await generateMarvelApiRequest(id)
    console.log("Hola")
    const promisesResolves = await Promise.all(promises)
    console.log(promisesResolves)
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
    // const writers: string[] = []
    // const editors: string[] = []
    // const colorists: string[] = []

    // comicsResponse.data.data.results.forEach((element: any) => {
        // const { id, title, creators, characters } = element
        // creators.items.forEach((e: any) => {
            // if (e.role === 'editor') editors.push(e.name)
            // if (e.role === 'writer') writers.push(e.name)
            // if (e.role === 'colorist') colorists.push(e.name)
        // });
    // });
    // const setWriters = new Set(writers)
    // console.log(setWriters)
    // const res = await characterRef.update({
        // writers:[...setWriters],
        // editors:admin.firestore.FieldValue.arrayUnion(editors),
        // colorists:admin.firestore.FieldValue.arrayUnion(colorists)
    // });
    // console.log({ writers, editors, colorists })
    return
}

