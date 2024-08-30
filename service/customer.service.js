import prisma from "../lib/prisma.js"

export const getAll = async () => {
    return await prisma.customers.findMany({
        where : {
            status : 'Active',
        }
    })
}