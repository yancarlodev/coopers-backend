import * as express from "express"
import { ISessionRequest } from "../../interfaces/session.interface"

declare global {
    namespace Express {
        interface Request {
            userId: string,
            validatedBody: ISessionRequest
        }
    }
}