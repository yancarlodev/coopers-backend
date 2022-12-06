import { ToDos } from '@prisma/client'
import * as express from 'express'
import { ISession } from '../../interfaces/session.interface'
import { IToDo } from '../../interfaces/toDos.interface'

declare global {
    namespace Express {
        interface Request {
            userId: string
            validatedBody: ISession | IToDo | Partial<IToDo> | any
            toDo: ToDos
        }
    }
}