import { dockRepository } from "../../repository/dock.repository.js";
import { sortTransactionsByQueuePriority } from "../../utils/queue_priority_utils.js";

export const getAllDock = async (formattedDate,user_id,location_id) => {
    try {
        const docks = await dockRepository.findDockWithQueueTransactions(location_id, formattedDate );

        const dockWithPriority = docks.map(dock => {
            const transactions = dock.transactions ? dock.transactions : [];
            const priorityQueue = sortTransactionsByQueuePriority(transactions);
            return {
                is_pemesanan_dia : transactions.some(transaction => transaction.user_id === user_id),
                dock_id: dock.dock_id || null,
                nama_dock: dock.dock_name || null,
                kapasitas_dock: dock.max_capacity || null,
                terisi_dock: dock.transactions.length > 0 ? dock.transactions.length : 0,
                sisa_dock: dock.max_capacity - dock.transactions.length > 0 ? dock.transactions.length : 0,
                no_antrian: priorityQueue[0]?.queue || null,
                no_kendaraan: priorityQueue[0]?.no_kendaraan || null,
            }
        })

        return dockWithPriority;

    } catch (err) {
        throw new Error(`Error in getAllDock: ${err.message}`);
    }
};

export const getBooking = async (formattedDate,user_id,dock_id, location_id) => {
    try {
        const docks = await dockRepository.findDockWithQueueTransactionsByDockId(location_id, dock_id,formattedDate);
      
        const dockWithPriority = docks.map(dock => {
            const transactions = dock.transactions.map(transaction => {
                return {
                    user_id: transaction.user_id || null,
                    queue: transaction.queue || null,
                    no_kendaraan: transaction.no_kendaraan || null,
                    driver: transaction.driver || null,
                    is_pemesanan_dia: transaction.user_id ? transaction.user_id === user_id : null,

                };
            });

            const priorityQueue = sortTransactionsByQueuePriority(transactions); 

            return priorityQueue;
        });

        return {
            nama_dock: docks ? docks[0].dock_name : null,
            call_driver_init_queue : docks ? docks[0].transactions[0].queue : null,
            call_driver_init_no_kendaraan : docks ? docks[0].transactions[0].no_kendaraan : null,
            transactions: dockWithPriority,
        };

    } catch (err) {
        throw new Error(`Error in getBooking: ${err.message}`);
    }
}
