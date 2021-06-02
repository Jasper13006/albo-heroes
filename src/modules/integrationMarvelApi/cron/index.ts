import cron from 'node-cron';
import { createCharacterInDatabase } from '../service';

const task = cron.schedule('0 1 * * *', async () => {
    console.info('Running a character sync at 01:00 at America/Mexico_City timezone');
    await createCharacterInDatabase('ironman')
    await createCharacterInDatabase('capamerica')
}, {
    scheduled: true,
    timezone: "America/Mexico_City"
});
(async()=>{
    await createCharacterInDatabase('ironman')
    await createCharacterInDatabase('capamerica')
    task.start()
})()
