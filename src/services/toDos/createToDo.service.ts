import { ToDos, Users } from '@prisma/client'
import { prisma } from '../../app'
import { IToDo } from '../../interfaces/toDos.interface'

export default async function createToDoService(userId: string, validatedData: IToDo): Promise<ToDos> {    
    const newToDo: ToDos = await prisma.toDos.create({
        data: {
            ...validatedData,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })

    return newToDo
}