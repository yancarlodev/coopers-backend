import { ToDos } from '@prisma/client'
import { prisma } from '../../app'

export default async function getAllToDosService(): Promise<ToDos[]> {
    const allToDos: ToDos[] = await prisma.toDos.findMany()

    return allToDos
}