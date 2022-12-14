import { SchemaOf } from 'yup'
import { Request, Response, NextFunction } from 'express'
import { ISession } from '../interfaces/session.interface'
import { IToDo, IToDoSerializer } from '../interfaces/toDos.interface'

const validateSerializer = (serializer: SchemaOf<ISession | IToDoSerializer | Partial<IToDo>>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = await serializer.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        })

        req.validatedBody = validatedBody

        return next()
    } catch (error: any) {
        return res.status(400).json({
            statusCode: 400,
            message: error.errors.join(', ')
        })
    }
} 

export default validateSerializer