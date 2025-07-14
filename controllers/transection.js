import Transection from "../models/transection.js"



export const createTransection=async(req,res,next)=>{
    try {
        const transection=await Transection.create({...req.body,createdBy: req.user._id})
        res.status(201).json(transection)
    } catch (error) {
        next(error)
    }
}


  export const getAllTransactions=async(req,res,next)=>{
    try {
        const transactions=await Transection.find({createdBy:req.user._id}).sort({createdAt:1})
        res.status(200).json(transactions)
    } catch (error) {
        next(error)
    }
  }
  


  export const updateTransection=async(req,res,next)=>{
try {
    const transection=await Transection.findOneAndUpdate({
        _id:req.params.id,createdBy:req.user._id
    },req.body,{new:true})
    if(!transection) return res.status(404).json({message:"transection not found"})
        res.json(transection)
} catch (error) {
    next(error)
}
  }

  
export const deleteTransection=async(req,res,next)=>{
    try {
        const transection=await Transection.findOneAndDelete({
            _id:req.params.id,createdBy:req.user._id
        })
        if(!transection) return res.status(404).json("transection not found")
            res.json({message:"transection deleted"})
    } catch (error) {
        next(error)
    }
}


export const getMonthlySummary=async(req,res,next)=>{
    try {
        const {month,year}=req.query;
        if(!month || !year){
            return res.status(400).json({meesage:"month and year not get any info"})
        }
const start=new Date(`${year}-${month}-01`)
const end=new Date(start)
end.setMonth(end.getMonth() + 1)
// ✅ Check if dates are valid
if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: "Invalid month or year format." });
  }
const transactions=await Transection.find({
    createdBy:req.user._id,
    date:{$gte:start, $lt:end}
})

const summary={
    income:{},
    expense:{}
};

for(let txn of transactions){
    const {category, amount,type}=txn
    if(!summary[type][category]){
        summary[type][category]=0
    }
    summary[type][category] +=amount
}
res.json(summary)

    } catch (error) {
        next(error)
    }
}