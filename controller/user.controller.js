import { login, register } from "../service/user.service.js"

export const registerController  = async (req, res, next) => {
    try {
        const result = await register(req.body)
        return res.status(201).json({
            status:"success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const token = await login(req.body, res)
        return res.status(200).json({
            status:"success",
            token : token
        })
    } catch (error) {
        next(error)
    }
}

export const getDetail = async (req, res, next) => {
    try {
        return res.status(200).json({
            status:"success",
            data:req.user
        })
    } catch (error) {
        next(error)
    }
}