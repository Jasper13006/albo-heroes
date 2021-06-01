import mongoose, { ConnectionOptions } from 'mongoose'
import config from './config'
import firebaseAdmin from 'firebase-admin';
(async () => {
    try {
        const mongooseOptions: ConnectionOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,

        }
        const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, mongooseOptions)
        console.log(`database is connected to: ${db.connection.name}`)
    } catch (err) {
        console.error(err)
    }
})()

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(`${config.FIREBASE_CREDENTIALS}`),
});
export const auth = firebaseAdmin.auth()
const database: firebaseAdmin.firestore.Firestore = admin.firestore();  
export default database;