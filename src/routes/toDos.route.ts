import { Router } from 'express'
import getAllToDosController from '../controllers/toDos/getAllToDos.controller'
import validateAuthMiddleware from '../middlewares/validateAuth.middleware'

const router = Router()

router.get('/', validateAuthMiddleware, getAllToDosController)
router.post('/')
router.patch('/:id')
router.delete('/:id')

export default router