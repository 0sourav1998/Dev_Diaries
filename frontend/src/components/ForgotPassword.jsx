import React, { useState } from 'react'
import { resetPasswordToken } from '../services/operations/user';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async()=>{
        try {
            setLoading(true)
            await resetPasswordToken({email},navigate)
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='h-[80vh] w-full flex justify-center items-center'>
         <div className='w-1/4 p-8 bg-gray-800 shadow-xl flex flex-col gap-6'>
            <h1 className='text-white text-semibold'>Enter Your Email</h1>
            <input
            onChange={(e)=>setEmail(e.target.value)}
            className='w-full p-2 bg-gray-700 text-white outline-none focus-within:ring-2 focus-within:outline-emerald-800' 
            placeholder='Email'
            />
         <button onClick={handleSubmit} className='w-full p-2 bg-gradient-to-r from-emerald-950 to-gray-800 text-white hover:scale-110 transition-all duration-300'>
            {
                loading ? "Loading..." : "Submit"
            }
         </button>
         </div>
    </div>
  )
}
