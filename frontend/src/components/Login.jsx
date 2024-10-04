import React, { useState } from "react";
import { login } from "../services/operations/user";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Login = () => {
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
      <div className="flex flex-col gap-4 w-1/4 p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl text-gray-100 text-center mb-4">Login</h1>
        <input
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          type="email"
          value={input.email}
          className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter Your Email..."
        />
        <input
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          type="password"
          value={input.password}
          className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          placeholder="Enter Your Password..."
        />
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
