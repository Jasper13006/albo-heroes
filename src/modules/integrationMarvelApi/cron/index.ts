import cron from 'node-cron';
import { getInformationOfCharacter } from '../service';

const task = cron.schedule('0 1 * * *', async () => {
    console.info('Running a character sync at 01:00 at America/Mexico_City timezone');
    await getInformationOfCharacter('ironman')
    await getInformationOfCharacter('capamerica')
}, {
    scheduled: true,
    timezone: "America/Mexico_City"
});
(async()=>{
    await getInformationOfCharacter('ironman')
    await getInformationOfCharacter('capamerica')
    task.start()
})()
