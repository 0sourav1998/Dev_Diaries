import React from "react";
import { useSelector } from "react-redux";

export const AllAuthors = () => {
  const { allAuthors } = useSelector((state) => state?.user);

  return (
    <div className="w-9/12 mx-auto">
      <h1 className="flex justify-center items-center text-gray-200 font-bold text-2xl mb-6">
        Authors
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {allAuthors &&
          allAuthors.length > 0 &&
          allAuthors?.map((author) => (
            <div
              key={author._id}
              className="flex flex-col items-center p-4 bg-gray-950 rounded-md shadow-lg"
            >
              <img
                src={author?.profilePicture}
                alt={author?.name}
                className="h-60 w-60 rounded-md mb-4 object-cover"
              />
              <div className="text-blue-500 font-semibold bg-gray-800 text-lg w-fit rounded-md px-4 py-1 mb-2">
                {author?.role}
              </div>
              <h1 className="text-gray-100 font-bold text-lg">{author?.name}</h1>
              <h3 className="text-gray-100 font-semibold text-md">{author?.email}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};
