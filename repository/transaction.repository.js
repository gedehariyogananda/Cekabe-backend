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

    async getCustomerOutstandingAll(formattedDate){
        return prisma.transaction.findMany({
            where: {
                is_outstanding_transaction: true, // this true
                booking_date: formattedDate
            },
            include: {
                customer: {
                }
            }
        })
    }

    async getCustomerOutstanding(user_id, formattedDate){
        return prisma.transaction.findMany({
            where: {
                is_outstanding_transaction: true, // this true
                user_id: user_id,
                booking_date: formattedDate
            },
            include: {
                customer: {
                }
            }
        })
    }

    async getCustomerHistory(user_id, formattedDate){
        return prisma.transaction.findMany({
            where: {
                user_id: user_id,
                is_outstanding_transaction: false,
                status: "GateOut",
                booking_date: formattedDate
            },
            include: {
                customer: {
            }
            }
        })
    }

    async getCustomerHistoryAll(formattedDate){
        return prisma.transaction.findMany({
            where: {
                is_outstanding_transaction: false,
                status: "GateOut",
                booking_date: formattedDate
            },
            include: {
                customer: {
            }
            }
        })
    }

    async getAllTransactionDate(formattedDate){
        return prisma.transaction.findMany({
            where: {
                booking_date: formattedDate
            }
        })
    }

    async createTransaction(transactionData){
        return prisma.transaction.create({
            data: transactionData
        })
    }

    async getTransactionByNumber(transaction_no){
        return prisma.transaction.findFirstOrThrow({
            where: {
                transaction_no: transaction_no
            }
        })
    }
}

const transactionRepository = new TransactionRepository();
export { transactionRepository };