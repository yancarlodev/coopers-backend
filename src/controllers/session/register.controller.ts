import { Request, Response } from 'express'
import RegisterService from '../../services/session/register.service'

export default async function RegisterController(req: Request, res: Response) {
    const registeredUser = await RegisterService(req.validatedBody)

    const { password, ...userWithoutPassword } = registeredUser

    return res.status(201).json(userWithoutPassword)
}