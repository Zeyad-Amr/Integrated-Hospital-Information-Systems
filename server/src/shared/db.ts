import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export type DbClient = PrismaClient
export default prisma