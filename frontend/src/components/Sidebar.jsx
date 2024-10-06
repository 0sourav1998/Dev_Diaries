import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
    const {user , token} = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const location = useLocation();

    const matchRoute = (path)=>{
        return path === location.pathname ;
    }

    useEffect(() => {
        if (location.pathname === "/dashboard") {
            navigate("/dashboard/myBlogs");
        }
    }, [location.pathname, navigate]);
    
    if(!token){
        return <Navigate to="/" />
    }
  return (
    <div className='h-[70%] md:w-[10%] w-[20%] bg-gray-800 rounded-md fixed'>
        <div className='flex flex-col gap-2 items-center md:p-4 p-1'>
            <img src={user?.profilePicture} alt={user?.name} className='md:h-12 md:w-12 h-6 w-6 rounded-full'/>
            <h1 className='text-gray-300 md:font-bold font-semibold text-xs md:text:sm'>{user?.name.split(" ")[0]}</h1>
        </div>
        <hr className='w-[70%] mx-auto'/>
        <div className='flex flex-col w-full items-center gap-6 justify-center mt-6'>
        <button onClick={()=>navigate("/dashboard/myBlogs")} className={`text-gray-300 font-semibold w-[80%] text-xs md:text-sm md:p-3 p-1 ${matchRoute("/dashboard/myBlogs") ? "bg-blue-700" : ""} `}>My Blogs</button>
            <button onClick={()=>navigate("/dashboard/create")} className={`text-gray-300 font-semibold w-[80%] text-xs md:text-sm md:p-3 p-1 ${matchRoute("/dashboard/create") ? "bg-blue-700" : ""} `}>Create Blog</button>
            <button onClick={()=>navigate("/dashboard/chart")} className={`text-gray-300 font-semibold w-[80%] text-xs md:text-sm md:p-3 p-1 ${matchRoute("/dashboard/chart") ? "bg-blue-700" : ""} `}>Chart</button>
            <button onClick={()=>navigate("/dashboard/me")} className={`text-gray-300 font-semibold w-[80%] text-xs md:text-sm md:p-3 p-1 ${matchRoute("/dashboard/me") ? "bg-blue-700" : ""} `}>My Profile</button>
            <button onClick={()=>navigate("/")} className='text-gray-300 font-semibold'>Home</button>
        </div>
    </div>
  )
}
