import { prisma } from '../../app'

export default async function deleteToDoService(toDoId: string): Promise<void> {
    await prisma.toDos.delete({
        where: {
            id: toDoId
        }
    })
}