import { Router } from 'express'
import createToDoController from '../controllers/toDos/createToDo.controller'
import deleteToDoController from '../controllers/toDos/deleteToDo.controller'
import getAllToDosController from '../controllers/toDos/getAllToDos.controller'
import updateToDoController from '../controllers/toDos/updateToDo.controller'
import checkIfToDoExistMiddleware from '../middlewares/checkIfToDoExist.middleware'
import checkIfUserOwnsToDoMiddleware from '../middlewares/checkIfUserOwnsToDo.middleware'
import validateAuthMiddleware from '../middlewares/validateAuth.middleware'
import validateSerializer from '../middlewares/validateSerializer.middleware'
import { toDoSerializer, toDoUpdateSerializer } from '../serializers/toDos.serializer'

const router = Router()

router.get('/', validateAuthMiddleware, getAllToDosController)
router.post('/', validateAuthMiddleware, validateSerializer(toDoSerializer), createToDoController)
router.patch('/:id', validateAuthMiddleware, validateSerializer(toDoUpdateSerializer), checkIfToDoExistMiddleware, checkIfUserOwnsToDoMiddleware, updateToDoController)
router.delete('/:id', validateAuthMiddleware, checkIfToDoExistMiddleware, checkIfUserOwnsToDoMiddleware, deleteToDoController)

export default router