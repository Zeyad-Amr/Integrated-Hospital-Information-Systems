import { Prisma } from "@prisma/client"
import { methodsArgs } from "../shared/interfaces/methodsArgs"

export interface Staff {
    name: string
}

export interface StaffResponse extends Staff {
    id?: string
}

export interface StaffMethodsArgs extends methodsArgs {
    FindManyArgs: Prisma.StaffFindManyArgs
    FindFirstOrThrowArgs: Prisma.StaffFindFirstOrThrowArgs
    UpdateArgs: Prisma.StaffUpdateArgs
    DeleteArgs: Prisma.StaffDeleteArgs
    DeleteManyArgs: Prisma.StaffDeleteManyArgs
    CountArgs: Prisma.StaffCountArgs
}