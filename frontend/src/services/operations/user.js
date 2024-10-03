import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../apis";
import {setToken , setUser} from "../../redux/slice/user.jsx"
import toast from 'react-hot-toast';

const {SIGN_UP,LOGIN} = userEndpoints ;

export const signup = async(body,navigate)=>{
    try {
        const response = await apiConnector("POST",SIGN_UP,body);
        if(response.data.success){
            toast.success(response.data.message);
            navigate("/login")
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error.message)
    }
}

export const login = (body,navigate)=>{
    return async(dispatch)=>{
        try {
            const response = await apiConnector("POST",LOGIN,body);
            if(response.data.success){
                toast.success("Logged In Successfully");
                navigate("/");
                dispatch(setToken(response.data.token))
                dispatch(setUser(response.data.user))
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
}