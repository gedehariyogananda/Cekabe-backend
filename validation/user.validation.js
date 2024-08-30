import { z } from "zod";


export const registerUserValidation = z.object({
    username: z.string().min(1,"username is required"), 
    password: z.string().min(1,"password is required"), 
});

export const loginUserValidation = z.object({
    username : z.string().min(1,"username is required"),
    passwrord : z.string().min(1, "password is required"),
})