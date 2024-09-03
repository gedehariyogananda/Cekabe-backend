import { dateFormatRepository } from "../../repository/date.format.repository.js";
import { getOutstandingTransaction } from "../../service/dashboard_service/outstanding.service.js";
import { formatDate } from "../../utils/date_format_utils.js";

export const getAllOutstanding = async (req, res, next) => {
    const format = await dateFormatRepository.dateFormat();
    const dateNow = new Date();

    let dateInit = dateNow;
    let formattedDate = ""; 

    if(req.query.date) {
        dateInit = new Date(req.query.date);
        formattedDate = formatDate(dateInit, format);
    } else {
        formattedDate = "2024-08-27"; // nti diganti ke bentuk formatDate(dateNow, format);
    }

    const user_id = req.user.user_id;

    try {
        const result = await getOutstandingTransaction(user_id, formattedDate)
        return res.status(200).json({
            status:"success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}