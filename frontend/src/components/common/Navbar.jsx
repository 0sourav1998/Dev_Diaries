import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slice/user";
import toast from "react-hot-toast";

export const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  return (
    <div className="w-full p-5 shadow-lg">
      <div className="w-8/12 mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-white font-bold text-3xl cursor-pointer hover:text-gray-200 transition-all duration-300">
            The Dev_<span className="text-yellow-400">Diaries</span>
          </h1>
        </div>
        
        {/* Links */}
        <div className="flex flex-row gap-8 text-white text-lg font-medium">
          <Link to="/">
            <span className="hover:text-yellow-400 transition-all duration-300">
              Home
            </span>
          </Link>
          <Link to="/blogs">
            <span className="hover:text-yellow-400 transition-all duration-300">
              Blogs
            </span>
          </Link>
          <Link to="/authors">
            <span className="hover:text-yellow-400 transition-all duration-300">
              All Authors
            </span>
          </Link>
          <Link to="/about">
            <span className="hover:text-yellow-400 transition-all duration-300">
              About
            </span>
          </Link>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-row gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
                  SignUp
                </button>
              </Link>
            </div>
          )}
          {token ? (
            <Link to="/dashboard">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300">
                Dashboard
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      <hr className="w-[80%] mx-auto mt-4 border-t-2 border-gray-200" />
    </div>
  );
};
