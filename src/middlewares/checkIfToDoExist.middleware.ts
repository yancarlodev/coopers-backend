import { NextFunction, Request, Response } from 'express'
import { prisma } from '../app'

export default async function checkIfToDoExistMiddleware(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id

    const toDoExist = await prisma.toDos.findUnique({
        where: {
            id
        }
    })

    if(!toDoExist) {
        return res.status(404).json({
            statusCode: 404,
            message: 'To-do not found'
        })
    }

    req.toDo = toDoExist

    next()
}