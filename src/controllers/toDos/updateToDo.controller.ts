import { Request, Response } from 'express'
import updateToDoService from '../../services/toDos/updateToDo.service'

export default async function updateToDoController(req: Request, res: Response) {
    const updatedToDo = await updateToDoService(req.toDo.id, req.validatedBody)

    return res.status(200).json(updatedToDo)
}