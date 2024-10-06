import React from "react";
import { useSelector } from "react-redux";

export const MyProfile = () => {
  const { user } = useSelector((state) => state?.user);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 p-4 mr-2 sm:mr-0">
      <div className="bg-gray-800 rounded-xl shadow-lg flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 p-6 md:p-12 w-full max-w-4xl">
        {/* Profile Picture */}
        {user && user.profilePicture && (
          <div className="relative">
            <img
              src={user?.profilePicture}
              alt={user?.name}
              className="md:h-72 md:w-60 h-36 w-36 object-cover rounded-xl transform md:rotate-6 shadow-xl"
            />
            <div className="absolute bottom-2 right-2 p-2 bg-gray-700 rounded-full shadow-md text-white text-xs">
              {user?.role}
            </div>
          </div>
        )}

        {/* User Info */}
        <div className="text-gray-300 flex flex-col gap-4 md:gap-6 md:text-lg text-[8px]">
          <h2 className="text-lg md:text-3xl font-bold text-yellow-400">Profile Details</h2>
          <p>
            <span className="font-semibold text-yellow-400">Name:</span> {user?.name}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Phone:</span> {user?.phone}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Education:</span> {user?.education}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Email:</span> {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};
