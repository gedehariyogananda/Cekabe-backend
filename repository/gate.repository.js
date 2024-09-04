import prisma from '../lib/prisma.js';

class GateRepository {
    async findAllGates(){
        return prisma.gates.findMany({
            where: {
                status: "Active"
            }
        });
    }

    async findAllGatesByAvailableToday(formattedDate){
        return prisma.gates.findMany({
            where: {
                status: "Active"
            }
        });
    }
}

const gateRepository = new GateRepository();
export { gateRepository };