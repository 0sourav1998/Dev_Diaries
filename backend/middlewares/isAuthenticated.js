import jwt from "jsonwebtoken"

export const isAuthenticated = async(req,res,next)=>{
    try {
        console.log("here")
        console.log("Cookies set: ", req.cookies)
        const token = req.cookies.token ;
        if(!token){
            return res.status(404).json({
                success : false ,
                message : "Token Not Found"
            })
        }
        console.log(token)
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("DECODE",decode)
        req.user = decode._id
        req.role = decode.role
        console.log(req.user,req.role);
        next();
    } catch (error) {
        console.log(error.message)
    }
}