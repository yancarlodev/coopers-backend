import { Request, Response } from 'express'
import getAllToDosService from '../../services/toDos/getAllToDos.service'

export default async function getAllToDosController(req: Request, res: Response) {
    const allTodos = await getAllToDosService(req.userId)

    return res.status(200).json(allTodos)
}