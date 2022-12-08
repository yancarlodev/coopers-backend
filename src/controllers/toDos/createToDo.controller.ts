import { Request, Response } from 'express'
import createToDoService from '../../services/toDos/createToDo.service'

export default async function createToDoController(req: Request, res: Response) {
    const newToDo = await createToDoService(req.userId, req.validatedBody)

    return res.status(201).json(newToDo)
}