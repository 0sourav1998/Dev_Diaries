import { v2 as cloudinary } from "cloudinary";

export const sendFileToCloudinary = async(file,folder,height,quality)=>{
    try {
        const options = {
            folder : folder ,
            resource_type : "auto"
        } ;
        if(height){
            options.height = height
        }
        if(quality){
            options.quality = quality 
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath,options);
        return result ;
    } catch (error) {
        console.log(error.message)
    }
}