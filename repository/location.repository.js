import prisma from '../lib/prisma.js';

class LocationRepository {
    async findAllLocation(){
        return prisma.locations.findMany({
            include: {
                gates: {
                    where: {
                        status: "Active"
                    },
                    select: {
                        gate_name: true,
                        location_id: true
                    }
                }
            }
        });
    }
}

const locationRepository = new LocationRepository();
export { locationRepository };