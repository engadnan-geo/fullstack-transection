
export const notfound=(req,res,next)=>{
    const error =new Error(`Router ${req.originalUrl} not found`)
    error.statusCode=404
    next(error)
}