import express from "express" 
import mongoose from "mongoose"
import dotenv from "dotenv"
import { logger } from "./middleware/logger.js"
import { notfound } from "./middleware/notFond.js"
import { errorhandle } from "./middleware/errorHandles.js"
import authRouter from "./routes/auth.js"
import profile from "./routes/upload.js"
import transection from "./routes/transection.js"
import dashboard from "./routes/admin.js"
import { limiter } from "./middleware/rateLimiter.js"
import helmet from "helmet"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./utils/swagger.js"
dotenv.config()

const app=express()
app.use(limiter);
app.use(express.json())
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(cors(
    {
        origin: [ "https://dugsiiye.com"]
    }
))
app.use(helmet())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(logger)

app.get("/",(req,res)=>{
    console.log("hi mam i love you ")
    res.send("hi mam i love you ")
})


// routes register
app.use("/auth",authRouter)
app.use("/",profile)
app.use("/",transection)
app.use("/admin",dashboard)







app.use(notfound)
app.use(errorhandle)


const PORT=process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log("hooyo asm"))
.catch((error)=> console.log("sorry error",error))




app.listen(PORT,()=>{
    console.log(`server isrunnig on http://localhost:${PORT}`)
})