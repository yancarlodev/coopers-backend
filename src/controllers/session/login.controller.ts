import { Request, Response } from 'express'
import LoginService from '../../services/session/login.service'

export default async function LoginController(req: Request, res: Response) {
    const token = await LoginService(req.validatedBody)
    
    return res.status(200).json({ token })
}