import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export const Blogs = () => {
  const { allBlogs } = useSelector((state) => state.blog);
  return (
    <div className="w-9/12 mx-auto">
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        {allBlogs && allBlogs.length > 0 ? (
          allBlogs?.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog._id}`}>
              <div className="text-gray-100 mr-4 mb-4">
                <div className="bg-gray-950 flex gap-6 rounded-md p-4 shadow-xl hover:opacity-70 cursor-pointer hover:scale-105 transition-all duration-300">
                  <img
                    className="h-48 w-40 object-cover"
                    src={blog?.image}
                    alt={blog.title}
                  />
                  <div className="flex flex-col gap-4">
                    <div className="w-fit bg-gray-700 text-blue-500 rounded-md px-3 py-1 font-bold">
                      {blog?.category}
                    </div>
                    <h1 className="text-lg font-bold text-gray-300">
                      Title : {blog?.title}
                    </h1>
                    <p className="text-xs text-gray-300 font-semibold">
                      Description : {blog.description.substring(0, 80)}...
                    </p>
                    <div className="flex flex-row gap-4 items-center">
                      <img
                        className=" h-8 w-8 rounded-full border-white"
                        src={blog?.authorId?.profilePicture}
                      />
                      <p>{blog?.authorId?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <BeatLoader />
        )}
      </div>
    </div>
  );
};
