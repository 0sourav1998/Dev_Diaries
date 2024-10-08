import React, { useState, useRef } from "react";
import { signup } from "../services/operations/user";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Signup = () => {
  const [visible, setVisible] = useState(false);
  const imageRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    education: "",
    role: "",
    phone: "",
    image: null,
  });

  const handleFileChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setInput({ ...input, image: image });
      const imageURL = URL.createObjectURL(image);
      setImagePreview(imageURL);
    }
  };

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
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/3 w-full sm:w-[80%] md:w-1/2 flex flex-col p-6 mt-3 bg-gray-900 rounded-lg shadow-lg"
      >
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
          <div className="relative">
            <input
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type={visible ? "text" : "password"}
              value={input.password}
              className="rounded-md w-full bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Enter Your Password..."
            />
            {visible && (
              <FaEye
                className="absolute top-2.5 right-4 text-white text-xl cursor-pointer"
                onClick={() => setVisible(false)}
              />
            )}
            {!visible && (
              <FaEyeSlash
                className="absolute top-2.5 right-4 text-white text-xl cursor-pointer"
                onClick={() => setVisible(true)}
              />
            )}
          </div>

          <input
            type="number"
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
          <div className="flex items-center justify-between gap-4 mb-2">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-20 h-20 object-cover rounded-full shadow-md mx-auto mb-4"
              />
            )}
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              onClick={() => imageRef.current.click()}
              type="button"
              className="p-2 w-full rounded-md bg-pink-600 text-white shadow hover:bg-pink-500 transition duration-200"
            >
              Select Your Photo
            </button>
          </div>
          <select
            onChange={(e) => setInput({ ...input, role: e.target.value })}
            className="rounded-md w-full mb-2 bg-gray-800 outline-none border-b-2 border-gray-600 text-gray-200 p-2 transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">Select Your Role</option>
            <option value="Author">Author</option>
            <option value="Reader">Reader</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-400 transition-all duration-200 shadow-lg"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
        <p className="mt-2 text-gray-300 text-xs text-center">
          Already have an account ?{" "}
          <Link to="/login" className="text-green-900 text-sm">
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};
