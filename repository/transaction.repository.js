import prisma from '../lib/prisma.js';

class TransactionRepository {
    async getSpesificTransactionWithCustomer(id){
        return prisma.transaction.findFirstOrThrow({
            where: {
                id: id
            },
            include : {
                customer: {
                }
            }
        })
    }
}

const transactionRepository = new TransactionRepository();
export { transactionRepository };