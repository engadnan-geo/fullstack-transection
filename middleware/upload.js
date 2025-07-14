import multer from "multer";


const storage=multer.memoryStorage()

export const upload=multer({
    storage,
    limits:{fieldSize:10*1024*1024}  //10m mb
})