import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export const HeroSection = () => {
  const { allBlogs } = useSelector((state) => state.blog);

  return (
    <div className="grid gap-6 sm:grid-cols-2 grid-cols-1 p-4">
      {allBlogs && allBlogs.length > 0 ? (
        allBlogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`}>
            <div className="flex relative flex-col rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img
                src={blog?.image}
                className="h-96 w-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                alt={blog?.title}
              />
              <div className="absolute bottom-8 sm:px-4 px-2">
                <h1 className="text-gray-100 lg:text-3xl text-lg font-semibold mb-2">
                  {blog?.title}
                </h1>
                <div className="flex items-center gap-4 mt-4">
                  <img
                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-700"
                    src={blog?.authorId?.profilePicture}
                    alt={blog?.authorId?.name}
                  />
                  <h1 className="text-gray-100 text-sm">
                    {blog?.authorId?.name}
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-2xl font-semibold text-gray-600">No Blogs Found</p>
      )}
    </div>
  );
};
