import * as admin from 'firebase-admin';
import db from '../../../database';
import { ICharacter } from '../../../interface';

export const createOrUpdate = async(characterData: ICharacter)=>{
    try {
        const characterRef = db.collection('characters').doc(`${characterData.id}`)
        const existCharacter = await characterRef.get()
        if(!existCharacter.exists){
            console.log("No Existo")
            const created = await characterRef.set(characterData);
            return created.writeTime;
        }else{
            console.log("existo")
            const updated = await characterRef.update(characterData);
            return updated.writeTime;
        }
    } catch (error) {
        console.error(error)
    }
}