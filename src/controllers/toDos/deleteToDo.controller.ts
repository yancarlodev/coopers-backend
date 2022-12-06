import { Request, Response } from 'express'
import deleteToDoService from '../../services/toDos/deleteToDoService'

export default async function deleteToDoController(req: Request, res: Response) {
    await deleteToDoService(req.toDo.id)

    return res.status(204).json()
}