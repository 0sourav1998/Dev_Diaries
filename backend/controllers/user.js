import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendFileToCloudinary } from "../utils/sendFileToCloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, education } = req.body;
    const {profilePicture} = req.files ;
    console.log(name, email, password, role, phone, education , profilePicture);
    
    if (!name || !email || !password || !role || !phone || !education || !profilePicture) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const response = await sendFileToCloudinary(profilePicture , process.env.CLOUDINARY_BLOG_FOLDER);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      role,
      education,
      password: hashedPassword,
      profilePicture : response.secure_url
    });
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Registration",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password , role} = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not Register",
      });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    const roleMatching = user.role === role
    if (isPasswordMatching && roleMatching) {
      const payload = {
        _id: user._id,
        role : user.role
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
        httpOnly: true,
      };

      return res.cookie("token", token, options).json({
        success: true,
        message: "User Logged In Successfully",
        token ,
        user
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Logging In",
    });
  }
};

export const getMyProfile = async(req,res)=>{
  try {
    console.log("here")
    const id = req.user;
    const user = await User.findById(id).select("-password -token");
    if(!user){
      return res.status(404).json({
        success : false ,
        message : "User not Found"
      })
    }
    return res.status(200).json({
      success : true ,
      message : "User fetched Successfully",
      user
    })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Profile",
    });
  }
}

export const getAuthors = async(req,res)=>{
  try {
    const authors = await User.find({role : "Author"});
    return res.status(200).json({
      success : true ,
      message : "Authors Fetched Successfully" ,
      authors
    })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Authors",
    });
  }
}