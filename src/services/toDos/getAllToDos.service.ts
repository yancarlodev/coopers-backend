import { ToDos } from '@prisma/client'
import { prisma } from '../../app'

export default async function getAllToDosService(userId: string): Promise<ToDos[]> {
    const allToDos: ToDos[] = await prisma.toDos.findMany({
        where: {
            userId
        }
    })

    return allToDos
}