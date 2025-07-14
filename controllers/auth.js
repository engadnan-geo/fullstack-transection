import User from "../models/user.js"
import { generatetoken } from "../utils/generateToken.js"




export const register=async(req,res,next)=>{
    let{name,password,email,role}=req.body
    try {
        email=email.toLowerCase()
        const exists=await User.findOne({email})
        if(exists)return res.status(404).json({message:"email already in user"})
            const user=await User.create({name,password,email,role})
        const token=generatetoken(user._id)
        res.status(201).json({token})
    } catch (error) {
        next(error)
    }
}





export const login=async(req,res,next)=>{
    let{email,password}=req.body
    try {
        email=email.toLowerCase()
        const user=await User.findOne({email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message:"invalid email or password"})
        }
        const token=generatetoken(user._id)
        res.json({token})
    } catch (error) {
        console.log(error)
        next(error)
    }
}