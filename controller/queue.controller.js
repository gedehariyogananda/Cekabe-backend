import { getDateFormat } from "../service/date.format.service.js";
import { dockSpecificVisibility, dockVisibility, getAllDock, getBooking } from "../service/queue.service.js";
import { formatDate } from "../utils/date_format_utils.js";

export const getAllDocks = async (req, res, next) =>{
    try {
        const loginLocationId = req.user.location_id;
        const user_id = req.user.user_id;

        if(loginLocationId == null) {
            return res.status(203).json({
                success: false,
                message: "Anda harus booking / pesan dahulu untuk melihat antrian",
            })
        }

        const dockData = await getAllDock(user_id,loginLocationId);
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

        if(loginLocationId == null) {
            return res.status(203).json({
                success: false,
                message: "Anda harus booking / pesan dahulu untuk melihat antrian",
            })
        }


        const bookingData = await getBooking(user_id,dock_id, loginLocationId);
        return res.status(200).json({
            success : true,
            message: "queue: get booking",
            data : bookingData
        })
    } catch (error) {
        next(error);
    }
}

// -------------------------- dock visibility ------------------ //
export const getAllDockVisibilities = async (req, res, next) => {
    try {
        const format = await getDateFormat();
        const dateNow = new Date();

        let dateInit = dateNow;
        let formattedDate = formatDate(dateNow, format);

        if(req.query.date) {
            dateInit = new Date(req.query.date);
            formattedDate = formatDate(dateInit, format);
        } else {
            formattedDate = formatDate(dateNow, format);
        }

        const location_id = req.user.location_id;
        const user_id = req.user.user_id;
        
        const dockVisibilities = await dockVisibility(formattedDate,user_id,location_id);
        return res.status(200).json({
            status : "success",
            data : dockVisibilities
        })
    } catch (error) {
        next(error);
    }
}

export const getSpesifyDockVisibilitieQueues = async (req, res, next) => {
    try {
        const id = req.params.id;

        const dockVisibilities = await dockSpecificVisibility(parseInt(id, 10));
        return res.status(200).json({
            status : "success",
            data : dockVisibilities
        })

    } catch (error) {
        next(error);
    }
}