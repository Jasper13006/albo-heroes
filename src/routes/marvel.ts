import {Router} from 'express'
const router = Router()
import * as Controller from '../modules/marvel/controller/index';

router.get('/', async (req, res) => {
    return res.status(200).send({ message: `Welcome to Marvel Comics` });
});


router.get('/colaborators/:characterName', Controller.getColaborators);

router.get('/characters/:characterName', Controller.getCharactersNested);


export default router;