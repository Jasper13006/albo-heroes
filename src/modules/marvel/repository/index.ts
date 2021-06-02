import * as admin from 'firebase-admin';
import db from '../../../database';
import { ICharacter } from '../../../interface/index';

const dbCharactersRef = db.collection('characters')

export const getCharacter = async (characterName: string): Promise<ICharacter | undefined> => {
    try {
        const characterSnapshot = await dbCharactersRef.where('alboName', '==', characterName).get();
        if (characterSnapshot.empty) {
            throw new Error('No character foud')
        }
        const response: ICharacter[] = []
        characterSnapshot.forEach(doc => {
            response.push(formatDocument(doc))
        })
        return response[0]
    } catch (error) {
        console.error(error)
    }
}

const formatDocument = (doc: admin.firestore.QueryDocumentSnapshot): ICharacter => {
    return{
        id: Number(doc.id),
        last_sync: doc.get('last_sync').toDate(),
        name: doc.get('name'),
        characters: doc.get('characters'),
        colaborators: doc.get('colaborators'),
        alboName: doc.get('alboName')
    }
}