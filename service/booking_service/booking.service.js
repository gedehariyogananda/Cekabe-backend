import { customerRepository } from "../../repository/customer.repository.js";
import { dockRepository } from "../../repository/dock.repository.js";
import { goodTypeRepository } from "../../repository/good.type.repository.js";
import { slotRepository } from "../../repository/slot.repository.js"
import { transactionRepository } from "../../repository/transaction.repository.js";
import { vehicleTypeRepository } from "../../repository/vehicle.repository.js";
import { createBookingValidation } from "../../validation/transaction.validation.js";
import validate from "../../validation/validation.js";

export const gateLocationAvailable = async (formattedDate) => {
    const allSlot = await slotRepository.availableSlots();

    const allTransaction = await dockRepository.findDockWithQueueTransactionsNoLocation(formattedDate);

    const dockWithSlots = allTransaction.map(dock => {
        const transactions = dock.transactions || [];

        const slots = allSlot.map(slot => {
            const bookedTransaction = transactions.find(transaction => transaction.slot_id === slot.id);

            let slotStatus = "Not Used";
            let bookingInfo = null;
            let id = null;

            if (bookedTransaction) {
                if (bookedTransaction.status === "GateOut" || bookedTransaction.status === "GateIn" || bookedTransaction.status === "Booked") {
                    id = bookedTransaction.slot_id;
                    slotStatus = "Used";
                    bookingInfo = bookedTransaction.no_kendaraan;
                }
            }

            return {
                ...slot,
                slot_id: id,
                status: slotStatus,
                booking: bookingInfo
            };
        })
        .filter(slot => slot.status === "Not Used");

        return {
            gate_name: dock.locations.gates[0].gate_name,
            dock_id: dock.dock_id,
            dock_name: dock.dock_name,
            slots: slots.length > 0 ? slots : "Booking Fulled"
        };
    });

    return dockWithSlots;

}


export const allCustomers = async () => {
   return await customerRepository.getAllCustomer();
}

export const goodTypes = async () => {
    return await goodTypeRepository.getAllGoodType();
}

export const vehicles = async () => {
    return await vehicleTypeRepository.allVehicleTypes();
}

export const booking = async (req,formattedDate) => {
    const { activity, 
        ref_doc_type, 
        ref_doc_no, 
        customer_id, 
        driver, 
        no_kendaraan, 
        vehicle_type_id, 
        container_no, 
        goods_type_id, 
        no_hp, 
        booking_date, 
        slot_id, 
        dock_id 
    } = req.body;

    const userID = req.user.user_id;

    try {
        const validates = validate(createBookingValidation, req.body);
        if (validates.error) {

            const errors = validates.error.errors ? validates.error.errors.map(err => ({
                path: err.path,
                message: err.message
            })) : [{ path: [], message: "Unknown validation error" }];

            return {
                status: 400,
                error: errors
            };
        }

        let transaction_no = "";
        let queue_no = "";
        const bookingTime = await slotRepository.findTimeSlot(slot_id);

        const allTransactionDates = await transactionRepository.getAllTransactionDate(formattedDate);
        const filteredTransactions = allTransactionDates.filter(transaction => {
            const regex = /-\w{2}-A\d{3}$/;
            return regex.test(transaction.transaction_no);
        });

        if (filteredTransactions.length === 0) {
            queue_no = "A001";
        } else {
            const queueNumbers = filteredTransactions.map(transaction => {
                const match = transaction.transaction_no.match(/-A(\d{3})$/);
                return match ? parseInt(match[1], 10) : 0;
            });
    
            const maxQueueNumber = Math.max(...queueNumbers);
            queue_no = `A${(maxQueueNumber + 1).toString().padStart(3, '0')}`;
        }
        

        const formattedBookingDate = booking_date.split("-").join("");
        const activityCode = activity === "Loading" ? "LD" : "UL";
        transaction_no = `${formattedBookingDate}-${activityCode}-${queue_no}`;

        
        let existingTransaction;
        try {
            existingTransaction = await transactionRepository.getTransactionByNumber(transaction_no);
        } catch (error) {
            existingTransaction = null;
        }
    
        if (existingTransaction) {
            queue_no = `A${(parseInt(queue_no.slice(1)) + 1).toString().padStart(3, '0')}`;
            transaction_no = `${formattedBookingDate}-${activityCode}-${queue_no}`;
        }
        
        const booking = await transactionRepository.createTransaction({
            activity,
            transaction_no,
            queue: queue_no,
            status: "Booked",
            ref_doc_type,
            ref_doc_no,
            customer_id,
            driver,
            no_kendaraan,
            vehicle_type_id,
            container_no,
            goods_type_id,
            no_hp,
            booking_date: formattedDate,
            booking_time: bookingTime.time,
            slot_id,
            dock_id,
            user_id : userID,
            is_outstanding_transaction: false,
        });

        return booking

    } catch (error) {
        return {
            status: 500,
            error: error
        };
    }
};