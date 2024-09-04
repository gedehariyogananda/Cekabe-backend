import prisma from '../lib/prisma.js';

class SlotRepository {
    async availableSlots(){
        return prisma.slot.findMany({
            select: {
                id: true,
                time: true
            }
        });
    }

    async findTimeSlot(idSlot){
        return prisma.slot.findFirst({
            where: {
                id: idSlot
            }
        });
    }
}

const slotRepository = new SlotRepository();
export { slotRepository };