import { dateFormatRepository } from "../../repository/date.format.repository.js";
import { dockSpecificVisibility, dockVisibility } from "../../service/dashboard_service/dock-visibility.service.js";
import { formatDate } from "../../utils/date_format_utils.js";

export const getAllDockVisibilities = async (req, res, next) => {
    try {
        const format = await dateFormatRepository.dateFormat();
        const dateNow = new Date();

        let dateInit = dateNow;
        let formattedDate = "2024-08-28"; // nti diganti ke bentuk formatDate(dateNow, format);

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