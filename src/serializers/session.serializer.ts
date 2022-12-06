import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ISession } from '../interfaces/session.interface'

export const loginSerializer: SchemaOf<ISession> = yup.object().shape({
    email: yup.string().email().required('Email is a required field'),
    password: yup.string().required('Password is a required field')
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()

export const registerSerializer: SchemaOf<ISession> = yup.object().shape({
    email: yup.string().email().required('Email is a required field'),
    password: yup.string().matches(/^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Password must contain at least 8 characters, one uppercase and one number').required('Password is a required field')
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()