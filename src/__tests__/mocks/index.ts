import { ISession } from "../../interfaces/session.interface"
import { IToDoSerializer } from "../../interfaces/toDos.interface"

export const mockedUser: ISession = {
    email: "matheuslima@mail.com",
    password: "Teste123"
}

export const mockedUserWithInvalidEmail: ISession = {
    email: "math",
    password: "Teste123"
}

export const mockedUserWithInvalidPassword: ISession = {
    email: "matheuslima@mail.com",
    password: "teste"
}

export const mockedAlternativeUser: ISession = {
    email: "joaofaria@mail.com",
    password: "Teste123"
}

export const mockedToDo: IToDoSerializer = {
    title: "Do the laundry",
    isComplete: false
}

export const mockedToDoWithoutIsComplete: Partial<IToDoSerializer> = {
    title: "Clean-up the house"
}