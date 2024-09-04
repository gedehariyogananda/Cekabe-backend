import { dateFormatRepository } from "../../repository/date.format.repository.js";
import { allCustomers, booking, gateLocationAvailable, goodTypes, vehicles } from "../../service/booking_service/booking.service.js";
import { formatDate } from "../../utils/date_format_utils.js";

export const gateLocation = async (req,res,next) => {
    const format = await dateFormatRepository.dateFormat();
        const dateNow = new Date();

        let dateInit = dateNow;
        let formattedDate = ""; 

        if(req.query.date) {
            dateInit = new Date(req.query.date);
            formattedDate = formatDate(dateInit, format);
        } else {
            formattedDate = "2024-08-28"; // nti diganti ke bentuk formatDate(dateNow, format);
        }

        try {
            const gateAvailables = await gateLocationAvailable(formattedDate);
            return res.status(200).json({
                success: true,
                message: "success get gate location",
                data : gateAvailables
            })

        } catch (error) {
            next(error);
        }
}

export const customers = async (req,res,next) => {
    try {
        const customers = await allCustomers();

        return res.status(200).json({
            success: true,
            message: "success get all customers",
            data : customers
        });

    } catch (error) {
        next(error);
    }
}

export const goodsType = async (req,res,next) => {
    try {
        const goodsType = await goodTypes();

        return res.status(200).json({
            success: true,
            message: "success get all goods type",
            data : goodsType
        });


    } catch (error) {
        next(error);
    }
}

export const vehiclesType = async (req,res,next) => {
    try {
        const vehiclesType = await vehicles();

        return res.status(200).json({
            success: true,
            message: "success get all vehicles type",
            data : vehiclesType
        });

    } catch (error) {
        next(error);
    }
}

// --------------- booking main ------------------------- //

export const bookingMain = async (req, res, next) => {
    try {
        const format = await dateFormatRepository.dateFormat(); 
        let formattedDate = ""; 
        let dateInit = "";

        if (req.body.booking_date) {
            dateInit = new Date(req.body.booking_date);
            formattedDate = formatDate(dateInit, format);
        } 

        const bookingResult = await booking(req, formattedDate);
        if (bookingResult.status === 400) {
            return res.status(bookingResult.status).json({
                success: false,
                errors: bookingResult.error
            });
        } else if (bookingResult.status === 500) {
            return res.status(bookingResult.status).json({
                success: false,
                errors: bookingResult.error
            });
        }

        return res.status(200).json({
            success: true,
            message: "Success booking",
            data: bookingResult
        });
    } catch (error) {
        console.error('Unexpected error:', error); 
        next(error);
    }
};
