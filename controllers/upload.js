import cloudinary from "../utils/cloudinary.js";

export const uploadfile=(req,res,next)=>{
    if(!req.file){
        return res.status(404).json({message:"nofile uploaded"})
    }
    const stream=cloudinary.uploader.upload_stream(
        {folder:"income app",resource_type:"auto"},
        (error,result)=>{
            if(error)return next(error)
                console.log(error)
            return res.status(201).json({
                success:true,
    fileUrl:result.secure_url
            })
        }
    )
    stream.end(req.file.buffer)
}