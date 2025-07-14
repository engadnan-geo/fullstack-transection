import express from "express"
import { protect } from "../middleware/auth.js"
import { authorize } from "../middleware/authorize.js"

const router=express.Router()


router.get("/dashboard",protect,authorize("admin"),(req,res)=>{
    res.json({message:`welcome to the admin dashboard : ${req.user.name}`})
})



export default router