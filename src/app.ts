import 'express-async-errors'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import handleErrorsMiddleware from './middlewares/handleErrors.middleware'
import sessionRouter from './routes/session.route'
import toDosRouter from './routes/toDos.route'
import cors from 'cors'

export const prisma = new PrismaClient()
export const app = express()
app.use(express.json())
app.use(cors())

app.use('/session', sessionRouter)
app.use('/todos', toDosRouter)

app.use(handleErrorsMiddleware)