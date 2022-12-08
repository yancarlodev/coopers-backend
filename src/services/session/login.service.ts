import { compareSync } from 'bcryptjs'
import { prisma } from '../../app'
import AppError from '../../errors/AppError'
import { ISession } from '../../interfaces/session.interface'
import jwt from 'jsonwebtoken'
import { Users } from '@prisma/client'

export default async function LoginService(validatedData: ISession): Promise<string> {
    const { email, password } = validatedData

    const user: Users | null = await prisma.users.findFirst({ 
        where: {
            email
        }
     })

    const passwordMatch = compareSync(password, user?.password! || '')

    if(!user || !passwordMatch) {
        throw new AppError('Email or password invalid', 403)
    }

    const token = jwt.sign({}, process.env.SECRET_KEY as string, { subject: user.id, expiresIn: '24h' })

    return token
}