import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendFileToCloudinary } from "../utils/sendFileToCloudinary.js";
import { sendMail } from "../utils/sendMail.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "../Template/EmailTemplate.js";
import crypto from "crypto"

export const sendOtp = async (req,res) => {
  try {
    const { otp } = req.body;
    console.log("OTP",otp)
    const user = await User.findOne({ otp: otp });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect OTP",
      });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired , please regenerate your otp",
      });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    console.log("USER",user)
    return res.status(200).json({
      success: true,
      message: "Account Verified",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong while Verifying Account",
    });
  }
};
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, education } = req.body;
    const { profilePicture } = req.files;
    console.log(name, email, password, role, phone, education, profilePicture);

    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !phone ||
      !education ||
      !profilePicture
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const response = await sendFileToCloudinary(
      profilePicture,
      process.env.CLOUDINARY_BLOG_FOLDER
    );
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const generateOtp = Math.floor(100000 + Math.random() * 900000);

    await User.create({
      name,
      email,
      phone,
      role,
      education,
      password: hashedPassword,
      profilePicture: response.secure_url,
      otp: generateOtp,
      otpExpires: Date.now() + 5 * 60 * 1000,
    });

    await sendMail(email,"Verify Your Email",VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",`${generateOtp}`));

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
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not Register",
      });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    const roleMatching = user.role === role;
    if (isPasswordMatching && roleMatching) {
      const payload = {
        _id: user._id,
        role: user.role,
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
        token,
        user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Logging In",
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    console.log("here");
    const id = req.user;
    const user = await User.findById(id).select("-password -token");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Profile",
    });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await User.find({ role: "Author" });
    return res.status(200).json({
      success: true,
      message: "Authors Fetched Successfully",
      authors,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong While Fetching Authors",
    });
  }
};

export const resetPasswordLink = async(req,res)=>{
  try {
    const {email} = req.body ;
    const user = await User.findOne({email : email});
    if(!user){
      return res.status(404).json({
        success : false ,
        message : "User With these Email not found"
      })
    }
    const token = await crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token ;
    user.resetPasswordExpires = Date.now() + 10*60*1000 ;
    await user.save();
    const url = `http://localhost:5173/forgot-password/${token}`;
    await sendMail(email,"Forgot Password Mail",PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",url));
    return res.status(200).json({
      success : true ,
      message : "Reset Password Link Sent To Your Email"
    })

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success : false ,
      message : "Something Went Wrong While Sending Reset Password Link"
    })
  }
}


export const resetPassword = async(req,res)=>{
  try {
    const {newPassword,confirmNewPassword,token} = req.body ;
    console.log(newPassword,confirmNewPassword,token)
    const user = await User.findOne({resetPasswordToken : token});
    if(!user){
      return res.status(404).json({
        success : false ,
        message : "User Not Found"
      })
    }
    if(newPassword !== confirmNewPassword){
      return res.status(400).json({
        success : false ,
        message : "Password Does not Match"
      })
    }
    if(user.resetPasswordExpires < Date.now()){
      return res.status(400).json({
        success : false ,
        message : "Token Expired"
      })
    }
    const hashedNewPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedNewPassword ;
    user.resetPasswordToken = undefined ;
    user.resetPasswordExpires = undefined ;
    await user.save();
    return res.status(200).json({
      success : true ,
      message : "Password Changed Successfully"
    })
  } catch (error) {
    return res.status(400).json({
      success : false ,
      message : error.message
    })
  }
}