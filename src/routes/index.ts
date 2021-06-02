import {Router} from 'express'
import characterRoutes from './marvel'
import {createCharacterInDatabase} from '../modules/integrationMarvelApi/service/index'
const router = Router()

router.get('/', async (req, res) => {
    return res.status(200).send({ message: `Welcome to albo comics bookstore` });
});
router.get('/populate/',async (req, res)=>{
    createCharacterInDatabase("ironman")
    createCharacterInDatabase("capamerica")
    return res.send({message:"populate iniciated"})
})

router.use('/marvel',characterRoutes);


export default router;