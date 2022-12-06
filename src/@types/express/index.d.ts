import * as express from 'express'
import { ISession } from '../../interfaces/session.interface'

declare global {
    namespace Express {
        interface Request {
            userId: string,
            validatedBody: ISession
        }
    }
}