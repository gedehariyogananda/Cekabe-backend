import { transactionRepository } from "../../repository/transaction.repository.js";
import { userRepository } from "../../repository/user.repository.js";

export const getHistory = async (user_id, formattedDate) => {
    const userInit = await userRepository.getRolesUser(user_id);

    // 2 -> checker, 3 -> operator gate, 4,5,6 -> nduwuran
    const allowedRoles = [2, 3, 4, 5, 6];

    if (allowedRoles.includes(parseInt(userInit.role_id))) {
        return transactionRepository.getCustomerHistoryAll(formattedDate);
    } else {
        return transactionRepository.getCustomerHistory(userInit.role_id, formattedDate);
    }

}