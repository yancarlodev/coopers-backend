import { Router } from 'express'
import LoginController from '../controllers/session/login.controller'
import RegisterController from '../controllers/session/register.controller'
import checkIfEmailIsAlreadyInUseMiddleware from '../middlewares/checkIfEmailIsAlreadyInUse.middleware'
import validateSerializer from '../middlewares/validateSerializer.middleware'
import { loginSerializer, registerSerializer } from '../serializers/session.serializer'

const router = Router()

router.post('/login', validateSerializer(loginSerializer), LoginController)
router.post('/register', validateSerializer(registerSerializer), checkIfEmailIsAlreadyInUseMiddleware, RegisterController)

export default router