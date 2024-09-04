import prisma from '../lib/prisma.js';

class CustomerRepository {
    async getAllCustomer(){
        return await prisma.customers.findMany({
            where: {
                status: "Active"
            },
            select: {
                customer_id: true,
                customer_name: true
            }
        });
    }  
}

const customerRepository = new CustomerRepository();
export { customerRepository };