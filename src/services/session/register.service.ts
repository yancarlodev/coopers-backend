import { Users } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { prisma } from '../../app'
import { ISession } from '../../interfaces/session.interface'

export default async function RegisterService(validatedData: ISession): Promise<Users> {
    const hashedPassword = hashSync(validatedData.password, 10)

    const userWithHashedPassword = {
        ...validatedData,
        password: hashedPassword
    }
    
    const newUser: Users = await prisma.users.create({
        data: userWithHashedPassword
    })

    return newUser
}