import {z} from "zod"



export const createUserSchema=z.object({
    name:z.string().min(1,"name is requared"),
    email:z.string().email("email must be valid"),
    password:z.string().min(6,"password must be at least 6 ").max(100,"password must be 100 character")

})