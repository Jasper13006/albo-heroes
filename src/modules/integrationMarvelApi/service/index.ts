import axios from 'axios'
import * as admin from 'firebase-admin';
import db from '../../../database';
import config from '../../../config'
import { hasher, makeChunks } from '../../../utils/index';

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

const createRequestCollection = async (characterId: number) => {
    console.time("first")
    const comicsResponse = await axios.get(`${config.MARVEL_API}/characters/${characterId}/comics?limit=1&${auth}`)
    console.timeEnd("first")
    const nPages: number = Math.ceil(comicsResponse.data.data.total / 100)
    const arrayOfRequests = [...Array(nPages).keys()].map((e: number) => {
        const skipAndLimit = `limit=100&offset=${100 * e}`
        const url = `${config.MARVEL_API}/characters/${characterId}/comics?${skipAndLimit}&${auth}`
        return createRequestPromise(url)
    })

    return arrayOfRequests;
}

const createRequestPromise = (url: string) => {
    let promise = new Promise(async (resolve, reject) => {
        try {
            console.time(url)
            const comicResponse = await axios.get(url)
            console.timeEnd(url)
            resolve(comicResponse)
        } catch (err) {
            reject(err)
        }
    })
    return promise
}

export const getInformationOfCharacter = async (characterName: string): Promise<void> => {
    if (!config.PRIVATE_KEY || !config.PUBLIC_KEY) {
        throw new Error(`Nonexistent marvel credentials`)
    }
    // const ts: number = Date.now()
    // const hash: string = hasher([String(ts), config.PRIVATE_KEY, config.PUBLIC_KEY])
    // const auth: string = `apikey=${config.PUBLIC_KEY}&ts=${ts}&hash=${hash}`

    const last_sync = new Date()
    console.log("Llego aqui?")
    const characterResponse = await axios.get(`${config.MARVEL_API}/characters?name=Iron%20Man&${auth}`)
    const { name, id } = characterResponse.data.data.results[0]
    const promises = await createRequestCollection(id)
    console.log(promises)
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

