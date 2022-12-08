import { NextFunction, Request, Response } from 'express'
import { prisma } from '../app'
import AppError from '../errors/AppError'

export default async function checkIfEmailIsAlreadyInUseMiddleware(req: Request, res: Response, next: NextFunction) {
    const { email } = req.validatedBody
    
    const isEmailAlreadyInUse = await prisma.users.findUnique({
        where: {
            email 
        }
    })
    
    if(isEmailAlreadyInUse) {
        return res.status(409).json({
            statusCode: 409,
            message: 'Email is already in use'
        })
    }

    return next()
}