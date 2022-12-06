import { Router } from 'express'
import validateSerializer from '../middlewares/validateSerializer.middleware'
import { loginSerializer, registerSerializer } from '../serializers/session.serializer'

const router = Router()

router.post('/login', validateSerializer(loginSerializer))
router.post('/register', validateSerializer(registerSerializer))

export default router