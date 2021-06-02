import cron from 'node-cron';
import { availableCharacters } from '../../../utils';
import { getInformationOfCharacter } from '../service';

const collectionForPopulateOrUpdate = ():any[]=>{
    const definedCharacters = availableCharacters()
    const collection: any[] = []
    Object.keys(definedCharacters).forEach(async (key)=>{
         collection.push(getInformationOfCharacter(key))
    })
    return collection
}

const task = cron.schedule('0 1 * * *', async () => {
    console.info('Running a character sync at 01:00 at America/Mexico_City timezone');
    await Promise.all([getInformationOfCharacter('ironman'),
    getInformationOfCharacter('capamerica')])
}, {
    scheduled: true,
    timezone: "America/Mexico_City"
});
(async () => {
    console.time("Populated completed in: ")
    await Promise.all(collectionForPopulateOrUpdate())
    console.timeEnd("Populated completed in: ")
    task.start()
})()
