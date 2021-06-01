import config from './config'
import firebaseAdmin from 'firebase-admin';

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(`${config.FIREBASE_CREDENTIALS}`),
});
export const auth = firebaseAdmin.auth()
const database: firebaseAdmin.firestore.Firestore = admin.firestore();  
export default database;