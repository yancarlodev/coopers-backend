import { Users } from "@prisma/client"

export type ISession = Omit<Users, 'id'>