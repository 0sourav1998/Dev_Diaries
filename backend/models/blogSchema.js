import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    description : {
        type : String ,
        required : true
    },
    image : {
        type : String ,
        required : true
    },
    category : {
        type : String ,
        required : true
    },
    titleTwo : {
        type : String 
    },
    descriptionTwo : {
        type : String 
    },
    imageTwo : {
        type : String 
    },
    titleThree : {
        type : String 
    },
    descriptionThree : {
        type : String 
    },
    imageThree : {
        type : String 
    },
    
    titleFour : {
        type : String 
    },
    descriptionFour : {
        type : String 
    },
    imageFour : {
        type : String 
    },
    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    } ,
    published : {
        type : Boolean ,
        default : false
    }
},{timestamps : true})

const Blog = mongoose.model("Blog",blogSchema);
export default Blog ;