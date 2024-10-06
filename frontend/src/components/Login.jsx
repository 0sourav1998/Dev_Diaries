import React, { useState } from "react";
import { login } from "../services/operations/user";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye , FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const [visible,setVisible] = useState(false)
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await dispatch(login(input, navigate));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center bg-[#181a2a]">
      <div className="flex flex-col gap-4 lg:w-1/3 w-full sm:w-[80%] md:w-1/2 p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl text-gray-100 text-center mb-4">Login</h1>
        <input
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          type="email"
          value={input.email}
          className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter Your Email..."
        />
        <div className="relative">
        <input
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          type={visible ? "text" : "password"}
          value={input.password}
          className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter Your Password..."
        />

        {
          visible && <FaEye className="absolute top-2.5 right-4 text-white text-xl cursor-pointer" onClick={()=>setVisible(false)}/>
        }
        {
          !visible && <FaEyeSlash className="absolute top-2.5 right-4 text-white text-xl cursor-pointer" onClick={()=>setVisible(true)}/>
        }
        </div>
        
        <select
          onChange={(e) => setInput({ ...input, role: e.target.value })}
          className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select Your Role</option>
          <option value="Author">Author</option>
          <option value="Reader">Reader</option>
        </select>
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-400 transition-all duration-200 shadow-lg"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="mt-2 text-gray-300 text-xs text-center">Don't have an account ? <Link to="/signup" className="text-green-900 text-sm">Signup Now</Link></p>
      </div>
    </div>
  );
};
