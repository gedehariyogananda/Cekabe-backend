import { dateFormatRepository } from "../../repository/date.format.repository.js";
import { dockSpecificVisibility, dockVisibility, getAllGate } from "../../service/dashboard_service/dock-visibility.service.js";
import { formatDate } from "../../utils/date_format_utils.js";

export const getAllDockVisibilities = async (req, res, next) => {
    try {
        const format = await dateFormatRepository.dateFormat();
        const dateNow = new Date();

        let dateInit = dateNow;
        let formattedDate = "2024-08-28"; // nti diganti ke bentuk formatDate(dateNow, format);

         // default nya di location gate 1 if user not have location_id
        let location_id = "";

        if(req.query.date) {
            dateInit = new Date(req.query.date);
            formattedDate = formatDate(dateInit, format);
        } else {
            formattedDate = formatDate(dateNow, format);
        }

        if(req.query.gate){
            location_id = req.query.gate;
        } else {
            location_id = req.user.location_id ? req.user.location_id : "44fd6430-5eb7-4679-909e-47c2b7b67283";
        }

        const user_id = req.user.user_id;
        
        const dockVisibilities = await dockVisibility(formattedDate,user_id,location_id);
        return res.status(200).json({
            success: true,
            message: "success get dock visibilities",
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
            success: true,
            message: "success get spesify for dock visibilities",
            data : dockVisibilities
        })

    } catch (error) {
        next(error);
    }
}

export const getAllGates = async (req, res, next) => {
    try {
        const gates = await getAllGate();

        return res.status(200).json({
            success : true,
            message : "get all gates to set filter",
            data : gates
        })

    } catch (error) {
        next(error);
    }
}