import React, { useState } from "react";
import { resetPassword } from "../services/operations/user";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await resetPassword({token,newPassword,confirmNewPassword}, navigate);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div className="w-1/4 p-4 bg-gray-800 shadow-xl flex flex-col gap-4">
        <div>
          <h1 className="text-white text-semibold mb-1">Enter New Password</h1>
          <input
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white"
            placeholder="New Password"
          />
        </div>
        <div>
          <h1 className="text-white text-semibold mb-1">
            Confirm New Password
          </h1>
          <input
            type="password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white"
            placeholder="Confirm New Password"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-gradient-to-r from-emerald-950 to-gray-800 text-white"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};
