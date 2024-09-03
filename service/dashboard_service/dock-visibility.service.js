import { dockRepository } from "../../repository/dock.repository.js";
import { gateRepository } from "../../repository/gate.repository.js";
import { slotRepository } from "../../repository/slot.repository.js";
import { transactionRepository } from "../../repository/transaction.repository.js";

export const dockVisibility = async (formattedDate,user_id, location_id) => {

    const statusWillGet = ['Cancel'];
    const transactionWithDock = await dockRepository.findDockWithQueueTransactions(location_id, formattedDate,statusWillGet );

    const availableSlots = await slotRepository.availableSlots();

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
    const transactionId = await transactionRepository.getSpesificTransactionWithCustomer(id);

    return {
        no_kendaraan: transactionId.no_kendaraan ? transactionId.no_kendaraan : null,
        activity: transactionId.activity ? transactionId.activity : null,
        customer_name: transactionId.customer.customer_name ? transactionId.customer.customer_name : null,
    }
}

export const getAllGate = async () => {
    const gates = await gateRepository.findAllGates();

    return gates.map(gate => {
        return {
            location_id: gate.location_id,
            gate_name: gate.gate_name
        };
    });
}
