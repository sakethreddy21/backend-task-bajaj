import {Router} from 'express'
import {GetRequest, PostRequest} from '../controllers/requests'
const router = Router()

router.post('/',PostRequest )
router.get('/', GetRequest)

export default router;