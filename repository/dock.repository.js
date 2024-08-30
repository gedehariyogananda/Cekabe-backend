import prisma from '../lib/prisma.js';

// ---- all default dock will be checked by location_id ---- //
class DockRepository {
    async findDockWithQueueTransactions(location_id, formattedDate, statusesTransaction = ['Cancel', 'GateOut']){
        return prisma.docks.findMany({
            where : {
                location_id: location_id
            },
            include : {
                transactions: {
                    where: {
                        booking_date: formattedDate,
                        NOT : {
                            status: {
                                in: statusesTransaction
                            }
                        }
                    },
                }
            }
        })
    }

    async findDockWithQueueTransactionsByDockId(location_id, dock_id, formattedDate, statusesTransaction = ['Cancel', 'GateOut']){
        return prisma.docks.findMany({
            where : {
                location_id: location_id,
                dock_id: dock_id
            },
            include : {
                transactions: {
                    where: {
                        booking_date: formattedDate,
                        NOT : {
                            status: {
                                in: statusesTransaction
                            }
                        }
                    },
                }
            }
        })
    }

}

const dockRepository = new DockRepository();
export { dockRepository };