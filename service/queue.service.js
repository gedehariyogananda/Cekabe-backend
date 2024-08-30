import prisma from '../lib/prisma.js';
import { formatDate } from '../utils/date_format_utils.js';
import { sortTransactionsByQueuePriority } from '../utils/queue_priority_utils.js';
import { getDateFormat } from './date.format.service.js';

export const getAllDock = async (user_id,location_id) => {
    try {
        const loginLocationId = location_id;
        const format = await getDateFormat();
        const dateNow = new Date();
        const formattedDate = formatDate(dateNow, format);

        const docks = await prisma.docks.findMany({
            where: {
                location_id: loginLocationId,
            },
            include : {
                transactions : {
                    where : {
                        booking_date: formattedDate,
                    },
                    NOT: {
                        status: {
                            in: ['Cancel', 'GateOut']
                        }
                    },
                    select : {
                        user_id: true,
                        queue : true,
                        no_kendaraan : true
                    }
                }
            }
        });

        const dockWithPriority = docks.map(dock => {
            const transactions = dock.transactions;
            const priorityQueue = sortTransactionsByQueuePriority(transactions);
            return {
                is_pemesanan_dia : transactions.some(transaction => transaction.user_id === user_id),
                dock_id: dock.dock_id,
                nama_dock: dock.dock_name,
                kapasitas_dock: dock.max_capacity,
                terisi_dock: dock.transactions.length,
                sisa_dock: dock.max_capacity - dock.transactions.length,
                no_antrian: priorityQueue[0]?.queue || null,
                no_kendaraan: priorityQueue[0]?.no_kendaraan || null,
            }
        })

        return dockWithPriority;

    } catch (err) {
        throw new Error(`Error in getAllDock: ${err.message}`);
    }
};

export const getBooking = async (user_id,dock_id, location_id) => {
    try {
        const format = await getDateFormat();
        const dateNow = new Date();
        const formattedDate = formatDate(dateNow, format);

        const docks = await prisma.docks.findMany({
            where: {
                location_id: location_id,
                dock_id: dock_id
            },
            include : {
                transactions : {
                    where : {
                        booking_date: formattedDate,
                    },
                    NOT : {
                        status: ['Cancel', 'GateOut']
                    },
                    select : { 
                        user_id: true,
                        queue : true,
                        no_kendaraan : true,
                        driver: true
                    }
                }
            }
        });
      
        const dockWithPriority = docks.map(dock => {
            const transactions = dock.transactions.map(transaction => {
                return {
                    ...transaction,
                    is_pemesanan_dia: transaction.user_id === user_id,
                };
            });

            const priorityQueue = sortTransactionsByQueuePriority(transactions); 

            return priorityQueue;
        });

        return {
            nama_dock: docks[0].dock_name,
            call_driver_init_queue : docks[0].transactions[0].queue,
            call_driver_init_no_kendaraan : docks[0].transactions[0].no_kendaraan,
            transactions: dockWithPriority,
        };

    } catch (err) {
        throw new Error(`Error in getBooking: ${err.message}`);
    }
}



// ------------------------- dock visibility service ------------------------- ////

export const dockVisibility = async (formattedDate,user_id, location_id) => {

    const transactionWithDock = await prisma.docks.findMany({
        where: {
            location_id: location_id,
        },
        include: {
            transactions: {
                where: {
                    booking_date: formattedDate,
                    NOT: {
                        status: {
                            in: ['Cancel']
                        }
                    }
                }
            }
        }
    });

    const availableSlots = await prisma.slot.findMany({
        select: {
            id: true,
            time: true
        }
    });

    const dockWithSlots = transactionWithDock.map(dock => {
        const transactions = dock.transactions || [];
        
        const slots = availableSlots.map(slot => {
            const bookedTransaction = transactions.find(transaction => transaction.slot_id === slot.id);

            let slotStatus = "Not Used";
            let bookingInfo = null;
            let is_pemesanan_dia = false;
            let id = null;

            if (bookedTransaction) {
                if (bookedTransaction.status === "Booked") {
                    id = bookedTransaction.id;
                    slotStatus = "Booked";
                    bookingInfo = bookedTransaction.no_kendaraan;
                    is_pemesanan_dia = bookedTransaction.user_id === user_id;
                } else if (bookedTransaction.status === "GateOut" || bookedTransaction.status === "GateIn") {
                    id = bookedTransaction.id;
                    slotStatus = "Used";
                    bookingInfo = bookedTransaction.no_kendaraan;
                    is_pemesanan_dia = bookedTransaction.user_id === user_id;
                    // bookingInfo = {
                    //     driver: bookedTransaction.driver,
                    //     transaction_no: bookedTransaction.transaction_no,
                    //     customer_id: bookedTransaction.customer_id
                    // };
                }
            }

            return {
                ...slot,
                id: id,
                status: slotStatus,
                booking: bookingInfo,
                is_pemesanan_dia: is_pemesanan_dia
            };
        });

        return {
            dock_id: dock.dock_id,
            dock_name: dock.dock_name,
            slots: slots
        };
    });

   return dockWithSlots
};

export const dockSpecificVisibility = async (id) => {
    const transactionId = await prisma.transaction.findFirstOrThrow({
        where: {
            id: id
        },
        include : {
            customer: {
                select: {
                    customer_name: true
                }
            }
        }
    })

    return {
        no_kendaraan: transactionId.no_kendaraan,
        activity: transactionId.activity,
        customer_name: transactionId.customer.customer_name
    }
}

