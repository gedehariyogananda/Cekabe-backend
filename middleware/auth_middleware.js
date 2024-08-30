import prisma from "../lib/prisma.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import ResponseError from "../error/response_error.js"

dotenv.config()

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    
    if(!token) {
        const error = new ResponseError("unauthorized", 401)
        return next(error)
    }
    const userId = jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!userId) {
        const error =  new ResponseError("unauthorized", 401)
        return next(error)
    }
    const user = await prisma.users.findUnique({
        where:{
            user_id: userId 
        },
        include:{
            role_user:{
                include:{
                    roles : true
                }
            }
        }
    })
    
    req.user = user   
    return next()
}



export const authorizeRole = (...roles)=>{
    return (req, res, next) => {
        const roleNames = req.user.role_user.map((roleUser) => roleUser.roles.name);
        if (!roles.includes(roleNames[0])) {
            return next(new ResponseError('Forbidden: You do not have the required permissions', 403));
        }
        return next();
    };
}