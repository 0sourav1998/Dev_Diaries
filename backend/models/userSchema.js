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
    }
})

export const User = mongoose.model("User",userSchema)