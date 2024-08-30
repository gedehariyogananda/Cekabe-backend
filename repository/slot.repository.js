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
}

const slotRepository = new SlotRepository();
export { slotRepository };