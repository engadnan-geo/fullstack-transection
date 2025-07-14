
import mongoose from "mongoose"
import bcrypt from "bcryptjs";





const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    password:String,
    role:{
        type:String,
        enum:[
            "user","admin"
        ],
        default:"user"
    }
})



//hash PASSWORD BEFORE FAVE
userSchema.pre("save",async function (next){
    // if the password has been the same 
    if(!this.isModified("password"))return next();
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})


// method to compare password

userSchema.methods.comparePassword=function(inputPassword){
    return bcrypt.compare(inputPassword,this.password)
}



const User=mongoose.model("user",userSchema)

export default User