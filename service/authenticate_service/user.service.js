import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import ResponseError from "../../error/response_error.js"
import validate from "../../validation/validation.js"
import prisma from "../../lib/prisma.js";
import { generateToken } from "../../lib/jwt.js";
import { registerUserValidation } from "../../validation/user.validation.js";

export const register = async (request) => {
    const user = validate(registerUserValidation, request)
    const isEmailExist = await prisma.users.findUnique({
        where :{
            username : user.username
        }
    })

    if(isEmailExist){
        throw new ResponseError("Email already exist", 400)
    }

    user.password = await bcrypt.hash(user.password, 10)
    user.user_id = uuidv4()
   
    return await prisma.users.create({
        data: user,
        select: {
            username: true,
        }
    });
}

export const login = async(request, response)=>{
    const user = validate(registerUserValidation, request)
    const isUserExist = await prisma.users.findUnique({
        where:{
            username: user.username
        }
    })

    if(!isUserExist){
        throw new ResponseError("Username or password is wrong", 401)
    }

    const isPasswordMatch = await bcrypt.compare(user.password, isUserExist.password)
    if(!isPasswordMatch){
        throw new ResponseError("Username or password is wrong", 401)
    }

    const token = generateToken(isUserExist.user_id)
    response.cookie("token", token)
    return token
}
