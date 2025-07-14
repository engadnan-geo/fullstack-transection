

    export const errorhandle=(err,req,res,next)=>{
        const status =err.statusCode || 500
        console.log(err)
        res.status(status).json({
            success:false,
            message:err.message || "something is wrong",
            status
        })
    }