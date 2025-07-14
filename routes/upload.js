import express from "express"
import { protect } from "../middleware/auth.js"
import { upload } from "../middleware/upload.js"
import { uploadfile } from "../controllers/upload.js"
const router=express.Router()


router.post("/profile-picture",protect,upload.single("file"),uploadfile)

router.post("/profile-picture",protect,upload.single("file"),uploadfile)

export default router