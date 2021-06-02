import * as admin from 'firebase-admin';
import db from '../../../database';
import { ICharacter } from '../../../interface';

export const createOrUpdate = async(characterData: ICharacter)=>{
    try {
        const characterRef = db.collection('characters').doc(`${characterData.id}`)
        const existCharacter = await characterRef.get()
        if(!existCharacter.exists){
            const created = await characterRef.set(characterData);
            return created.writeTime;
        }else{
            const updated = await characterRef.update(characterData);
            return updated.writeTime;
        }
    } catch (error) {
        console.error(error)
    }
}