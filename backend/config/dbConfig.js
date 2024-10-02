import mongoose from "mongoose";

export const connectToDB = async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log(error.message)
    }
}