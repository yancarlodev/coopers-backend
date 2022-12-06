import { ToDos } from '@prisma/client'

export type IToDo = Omit<ToDos, 'id' | 'userId'>
