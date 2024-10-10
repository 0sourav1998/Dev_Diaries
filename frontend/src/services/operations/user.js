import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../apis";
import {setToken , setUser} from "../../redux/slice/user.jsx"
import toast from 'react-hot-toast';

const {SIGN_UP,LOGIN,GET_ALL_AUTHORS,VERIFY_EMAIL,RESET_PASSWORD_LINK,RESET_PASSWORD} = userEndpoints ;

export const signup = async(body,navigate)=>{
    try {
        const response = await apiConnector("POST",SIGN_UP,body);
        if(response.data.success){
            toast.success(response.data.message);
            navigate("/verify-email")
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error.message)
    }
}

export const verifyEmail = async(otp,navigate)=>{
    try {
        const response = await apiConnector("POST",VERIFY_EMAIL,{otp});
        if(response?.data?.success){
            toast.success("Email Verified , Welcome To Dev_Diaries")
            navigate("/");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
}

export const login = (body,navigate)=>{
    return async(dispatch)=>{
        try {
            const response = await apiConnector("POST",LOGIN,body);
            if(response.data.success){
                console.log(response)
                toast.success("Logged In Successfully");
                dispatch(setToken(response.data.token))
                dispatch(setUser(response.data.user))
                navigate("/");
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
}

export const getAllAuthors = async()=>{
    let result ;
    try {
        const response = await apiConnector("GET",GET_ALL_AUTHORS);
        console.log(response)
        if(response?.data?.success){
            result = response?.data?.authors
        }
    } catch (error) {
        console.log(error.message)
    }
    return result ;
}

export const resetPasswordToken = async(email,navigate)=>{
    try {
        const response = await apiConnector("POST",RESET_PASSWORD_LINK,email);
        if(response?.data?.success){
            toast.success(response?.data?.message);
            navigate("/login")
        }
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
}

export const resetPassword = async(body,navigate)=>{
    try {
        const response = await apiConnector("POST",RESET_PASSWORD,body)
        if(response?.data?.success){
            toast.success(response?.data?.message);
            navigate("/login")
        }
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
}