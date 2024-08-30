import { dateFormatRepository } from "../../repository/date.format.repository.js";
import { getAllDock } from "../../service/dashboard_service/queue.service.js";
import { formatDate } from "../../utils/date_format_utils.js";

export const getAllDocks = async (req, res, next) =>{
    try {
        const loginLocationId = req.user.location_id;
        const user_id = req.user.user_id;

        const format = await dateFormatRepository.dateFormat();
        const dateNow = new Date();
        const formattedDate = "2024-08-28"; // nti diganti ke bentuk formatDate(dateNow, format);

        if(loginLocationId == null) {
            return res.status(203).json({
                success: false,
                message: "Anda harus booking / pesan dahulu untuk melihat antrian",
            })
        }

        const dockData = await getAllDock(formattedDate,user_id,loginLocationId);
        return res.status(200).json({
            success : true,
            message: "queue: get dock",
            data : dockData
        })
    } catch (error) {
        next(error);
    }
}

export const getBookings = async (req, res, next) => {
    try {
        const user_id = req.user.user_id;
        const dock_id = req.params.dock_id;
        const loginLocationId = req.user.location_id;

        const format = await dateFormatRepository.dateFormat();
        const dateNow = new Date();
        const formattedDate = "2024-08-28"; // nti diganti ke bentuk formatDate(dateNow, format);

        if(loginLocationId == null) {
            return res.status(203).json({
                success: false,
                message: "Anda harus booking / pesan dahulu untuk melihat antrian",
            })
        }


        const bookingData = await getBooking(formattedDate,user_id,dock_id, loginLocationId);
        return res.status(200).json({
            success : true,
            message: "queue: get booking",
            data : bookingData
        })
    } catch (error) {
        next(error);
    }
}