import { ToDos } from '@prisma/client'
import { prisma } from '../../app'
import { IToDo } from '../../interfaces/toDos.interface'

export default async function updateToDoService(toDoId: string, dataToBeUpdated: Partial<IToDo>): Promise<ToDos> {
    const updatedToDo = await prisma.toDos.update({
        where: {
            id: toDoId
        },
        data: dataToBeUpdated
    })

    return updatedToDo
}