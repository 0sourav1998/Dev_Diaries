import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true 
    },
    email : {
        type : String ,
        required : true ,
    },
    password : {
        type : String ,
        required : true ,
    },
    profilePicture : {
        type : String ,
        required : true
    },
    phone : {
        type : String ,
        required : true
    },
    education : {
        type : String 
    },
    role : {
        type : String ,
        enum : ["Reader","Author"]
    } ,
    createdOn : {
        type : Date ,
        default : ""
    } ,
    isVerified : {
        type : Boolean,
        default : false 
    },
    otp : String ,
    otpExpires : Date ,
    resetPasswordToken : String ,
    resetPasswordExpires : Date ,
})

export const User = mongoose.model("User",userSchema)