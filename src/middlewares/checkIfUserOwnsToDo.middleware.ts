import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'

export default async function checkIfUserOwnsToDoMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.toDo.userId != req.userId) {
        throw new AppError("You don't own this toDo", 403)
    }

    next()
}