import {Router} from 'express'
const router = Router()

router.get('/', async (req, res) => {
    return res.status(200).send({ message: `Welcome to Colaborators` });
});



export default router;