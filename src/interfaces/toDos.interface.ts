import { ToDos } from '@prisma/client'

export type IToDo = Omit<ToDos, 'id'>

export interface IToDoSerializer {
    title: string
    isComplete: boolean
}