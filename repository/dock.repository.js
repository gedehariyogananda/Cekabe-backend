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


    async findDockWithQueueTransactionsNoLocation(formattedDate, statusesTransaction = ['Cancel']){
        return prisma.docks.findMany({
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
                },
                locations: {
                    include: {
                        gates: true,
                    }
                }
            },
        })
    }

    async booking(req, transaction_no, queue){

        const { activity, ref_doc_type,ref_doc_no, customer_id, driver, no_kendaraan, vehicle_type_id, container_no, goods_type_id, no_hp, booking_date, slot_id, dock_id, user_id} = req.body;

        return await prisma.transaction.create({
            data: {
                activity: activity,
                transaction_no: transaction_no,
                queue: queue,
                status: "Booked",
                ref_doc_type: ref_doc_type,
                ref_doc_no: ref_doc_no,
                customer_id: customer_id,
                driver: driver,
                no_kendaraan: no_kendaraan,
                vehicle_type_id: vehicle_type_id,
                container_no: container_no,
                goods_type_id: goods_type_id,
                no_hp: no_hp,
                booking_date: booking_date,
                slot_id: slot_id,
                dock_id: dock_id,
                user_id: user_id
            }
        })
    }

}

const dockRepository = new DockRepository();
export { dockRepository };