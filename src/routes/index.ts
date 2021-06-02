import {Router} from 'express'
import characterRoutes from './marvel'
import {getInformationOfCharacter} from '../modules/integrationMarvelApi/service/index'
const router = Router()

router.get('/', async (req, res) => {
    return res.status(200).send({ message: `Welcome to albo comics bookstore` });
});
router.get('/update/',async (req, res)=>{
    getInformationOfCharacter("ironman")
    getInformationOfCharacter("capamerica")
    return res.send({message:"populate iniciated"})
})

router.use('/marvel',characterRoutes);


export default router;