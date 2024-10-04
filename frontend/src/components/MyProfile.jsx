import React from "react";
import { useSelector } from "react-redux";

export const MyProfile = () => {
  const { user } = useSelector((state) => state?.user);
  return (
    <div className="w-full h-full shadow-lg flex items-center justify-center">
      <div className="flex flex-row gap-12 shadow-2xl p-12">
        <div>
          {user && user.profilePicture && (
            <div>
              <img src={user?.profilePicture} className="h-72 w-60 rotate-6" />
            </div>
          )}
        </div>
        <div className="text-gray-400 text-2xl font-semibold flex flex-col gap-6">
          <p>Name : {user?.name}</p>
          <p>Phone : {user?.phone}</p>
          <p>Education : {user?.education}</p>
          <p>Email : {user?.email}</p>
          <p>Role : {user.role}</p>
        </div>
      </div>
    </div>
  );
};
