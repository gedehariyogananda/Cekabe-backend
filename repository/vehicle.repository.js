import prisma from '../lib/prisma.js';

class VehicleTypeRepository {
    async allVehicleTypes(){
        return await prisma.vehicle_types.findMany({
            where: {
                status: "Active"
            },
            select: {
                vehicle_type_id: true,
                vehicle_type: true
            }
        });
    }
}

const vehicleTypeRepository = new VehicleTypeRepository();
export { vehicleTypeRepository };