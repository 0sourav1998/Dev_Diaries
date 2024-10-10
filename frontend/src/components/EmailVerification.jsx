import React, { useEffect, useRef, useState } from "react";
import { verifyEmail } from "../services/operations/user";
import { useNavigate } from "react-router-dom";

export const EmailVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const otpRef = useRef([]);
  const handleChange = async (value, index) => {
    const otpValue = [...code];
    otpValue[index] = value;
    console.log(otpValue)
    setCode(otpValue);

    if (value && index < otpValue.length - 1) {
      otpRef.current[index + 1].focus();
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const otp = code.join("");
      await verifyEmail(otp, navigate);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    otpRef?.current[0]?.focus();
  }, []);
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div className="w-fit p-8 flex flex-col gap-6 shadow-xl bg-gray-800">
        <h1 className="text-2xl text-white">Verify Your Email</h1>
        <div className="flex gap-4">
          {code?.map((singleOtp, index) => (
            <input
              key={index}
              value={singleOtp}
              maxLength={1}
              ref={(el) => (otpRef.current[index] = el)}
              className="h-12 w-12 bg-gray-900 text-white text-center"
              onChange={(e) => handleChange(e.target.value, index)}
              placeholder="-"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-gradient-to-r from-emerald-800 to-gray-800 text-white"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};
