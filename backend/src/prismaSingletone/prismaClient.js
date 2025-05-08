import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.DATABASE_URL) {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export { prisma }
