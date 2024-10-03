import React, { useState, useRef } from "react";
import { signup } from "../services/operations/user";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const imageRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    education: "",
    role: "",
    phone: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("education", input.education);
      formData.append("phone", input.phone);
      formData.append("role", input.role);
      formData.append("profilePicture", input.image);
      setLoading(true);
      await signup(formData, navigate);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#181a2a]">
      <form onSubmit={handleSubmit} className="w-fit flex flex-col p-6 mt-3 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl text-gray-100 text-center mb-4">
          Sign Up
        </h1>
        <div className="flex flex-col gap-4">
          <input
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            value={input.name}
            className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter Your Name..."
          />
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
          <input
            type="tel"
            value={input.phone}
            onChange={(e) => setInput({ ...input, phone: e.target.value })}
            className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter Your Phone Number..."
          />
          <input
            onChange={(e) => setInput({ ...input, education: e.target.value })}
            value={input.education}
            className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Enter Your Education..."
          />
          <div className="flex justify-between gap-4 mb-4">
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={(e) => setInput({ ...input, image: e.target.files[0] })}
            />
            <button
              onClick={() => imageRef.current.click()}
              type="button"
              className="w-full p-2 rounded-md bg-pink-600 text-white shadow hover:bg-pink-500 transition duration-200"
            >
              Select Your Photo
            </button>
            <select
              onChange={(e) => setInput({ ...input, role: e.target.value })}
              className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Select Your Role</option>
              <option value="Author">Author</option>
              <option value="Reader">Reader</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-400 transition-all duration-200 shadow-lg"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
