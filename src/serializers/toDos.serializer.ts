import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IToDo, IToDoSerializer } from '../interfaces/toDos.interface'

export const toDoSerializer: SchemaOf<IToDoSerializer> = yup.object().shape({
    title: yup.string().required('Title is a required field'),
    isComplete: yup.boolean().notRequired()
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()

export const toDoUpdateSerializer: SchemaOf<Partial<IToDo>> = yup.object().shape({
    title: yup.string().notRequired(),
    isComplete: yup.boolean().notRequired()
}).noUnknown(true, (keys: any) => `The following key is not allowed or don't exist: ${keys.unknown}`).strict()