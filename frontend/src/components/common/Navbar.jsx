import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setToken, setUser} from "../../redux/slice/user";
import toast from "react-hot-toast"

export const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = ()=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success("Logged Out Successfully")
    navigate("/login")
  }
  return (
    <div className="w-full p-5">
      <div className="w-8/12 mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-white font-semibold text-2xl">
            The Dev_<span className="text-white font-bold text-2xl">Diaries</span>
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          <Link to="/">
            <span className="text-gray-100 text-xl hover:border-b border-gray-300 transition-all duration-300">Home</span>
          </Link>
          <Link to="/blogs">
            <span className="text-gray-100 text-xl hover:border-b border-gray-300 transition-all duration-300">Blogs</span>
          </Link>
          <Link to="/authors">
            <span className="text-gray-100 text-xl hover:border-b border-gray-300 transition-all duration-300">All Authors</span>
          </Link>
          <Link to="/about">
            <span className="text-gray-100 text-xl hover:border-b border-gray-300 transition-all duration-300">About</span>
          </Link>
        </div>
        <div className="flex flex-row gap-4">
          {token ? (
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-gray-200 px-4 py-2 transition-all duration-300 rounded-md">Logout</button>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="bg-green-600 hover:bg-green-700 text-gray-200 px-4 py-2 transition-all duration-300 rounded-md">Login</button>{" "}
              </Link>
              <Link to="/signup">
                <button className="bg-green-600 hover:bg-green-700 text-gray-200 px-4 py-2 transition-all duration-300 rounded-md">SignUp</button>{" "}
              </Link>
            </div>
          )}
          {token ? (
            <Link to="/dashboard">
              <button className="bg-green-600 hover:bg-green-700 text-gray-200 px-4 py-2 transition-all duration-300 rounded-md">Dashboard</button>{" "}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <hr className="w-[80%] mx-auto mt-4"/>
    </div>
  );
};
