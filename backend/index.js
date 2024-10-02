import express from "express"
const app = express();
import dotenv from "dotenv";
dotenv.config();

import cors from "cors"
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/dbConfig.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.js"



const PORT = process.env.PORT || 4000
app.use(cors({
    origin : "*",
    credentials : true
}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use("/api/v1/user",userRouter)

connectToDB();
cloudinaryConfig().then(()=>console.log("Cloudinary Connected Successfully"));
app.listen(PORT,()=>{
    console.log(`Server Is Running At Port ${PORT}`)
})