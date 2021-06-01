import {Router} from 'express'
import characterRoutes from './character'
import colaboratorRoutes from './colaborator'
import {getInformationOfCharacter} from '../modules/integrationMarvelApi/service/index'
const router = Router()

router.get('/', async (req, res) => {
    return res.status(200).send({ message: `Welcome to albo comics bookstore` });
});
router.get('/algo',async ()=>{
    getInformationOfCharacter("asd")
})

router.use('/character',characterRoutes);
router.use('/colaborator',colaboratorRoutes);

export default router;