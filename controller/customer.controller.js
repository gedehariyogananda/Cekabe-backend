import {getAll } from "../service/customer.service.js";

export const getAllCustomers = async (req, res, next) =>{
    try {
        const customers = await getAll();
        return res.status(200).json({
            status : "success",
            data : customers
        })
    } catch (error) {
        next(error);
    }
}