import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { token } = useSelector((state) => state.user);
  const handleLogout = ()=>{

  }
  return (
    <div className="w-full p-5">
      <div className="w-8/12 mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-white font-semibold text-2xl">
            Dev_<span className="text-white font-bold text-2xl">Diaries</span>
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          <Link to="/">
            <span className="text-gray-100 text-xl hover:border-b border-gray-300 transition-all duration-300">Home</span>
          </Link>
          <Link to="/">
            <span className="text-gray-100 text-xl hover:border-b border-gray-300 transition-all duration-300">Blogs</span>
          </Link>
          <Link to="/">
            <span className="text-gray-100 text-xl hover:border-b border-gray-300 transition-all duration-300">All Authors</span>
          </Link>
          <Link to="/">
            <span className="text-gray-100 text-xl hover:border-b border-gray-300 transition-all duration-300">About</span>
          </Link>
        </div>
        <div className="flex flex-row gap-4">
          {token ? (
            <Link to={handleLogout}>
              <button className="bg-red-600 hover:bg-red-700 text-gray-200 p-2 transition-all duration-300 rounded-md">Logout</button>{" "}
            </Link>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="bg-green-600 hover:bg-green-700 text-gray-200 p-2 transition-all duration-300 rounded-md">Login</button>{" "}
              </Link>
              <Link to="/signup">
                <button className="bg-green-600 hover:bg-green-700 text-gray-200 p-2 transition-all duration-300 rounded-md">SignUp</button>{" "}
              </Link>
            </div>
          )}
          {token ? (
            <Link to="">
              <button className="bg-green-600 hover:bg-green-700 text-gray-200 p-2 transition-all duration-300 rounded-md">Dashboard</button>{" "}
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
