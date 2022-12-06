import { hashSync } from 'bcryptjs'
import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ISessionRequest } from '../interfaces/session.interface'

export const loginSerializer: SchemaOf<ISessionRequest> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()

export const registerSerializer: SchemaOf<ISessionRequest> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().transform((password) => hashSync(password, 10)).required()
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()