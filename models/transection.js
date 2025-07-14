import mongoose from "mongoose"

const transectionSchema=new mongoose.Schema({
    title:{type:String,required:true},
    amount:{type:Number,required:true},
    type:{type:String,enum:["income","expense"],required:true},
    category:{type:String,required:true},
    date:{type:Date, default:Date.now,},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }

},{timestamps:true})

const Transection=mongoose.model("transsection",transectionSchema)

export default Transection