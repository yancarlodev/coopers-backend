import { Router } from 'express'
import createToDoController from '../controllers/toDos/createToDo.controller'
import getAllToDosController from '../controllers/toDos/getAllToDos.controller'
import validateAuthMiddleware from '../middlewares/validateAuth.middleware'
import validateSerializer from '../middlewares/validateSerializer.middleware'
import { toDoSerializer } from '../serializers/toDos.serializer'

const router = Router()

router.get('/', validateAuthMiddleware, getAllToDosController)
router.post('/', validateAuthMiddleware, validateSerializer(toDoSerializer), createToDoController)
router.patch('/:id')
router.delete('/:id')

export default router