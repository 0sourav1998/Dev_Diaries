import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogs } from "../services/operations/blogs";
import { setMyBlogs } from "../redux/slice/blog";
import { Link } from "react-router-dom";

export const MyBlogs = () => {
  const { token } = useSelector((state) => state?.user);
  const { myBlogs } = useSelector((state) => state?.blog);
  const dispatch = useDispatch();

  const fetchMyBlogs = async () => {
    const result = await getMyBlogs(token);
    dispatch(setMyBlogs(result));
  };

  useEffect(() => {
    fetchMyBlogs();
  }, [token]);

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-100">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog._id}`}>
              <div className="bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 cursor-pointer hover:shadow-2xl hover:bg-gray-700">
                <img
                  src={blog?.image}
                  alt={blog?.title}
                  className="object-cover h-52 w-full"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-200 hover:text-blue-400">
                    {blog?.title}
                  </h2>
                  <p className="text-gray-300 mt-3">
                    {blog?.description.length > 60
                      ? blog?.description.substring(0, 60) + "..."
                      : blog?.description}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No Blogs Found</p>
        )}
      </div>
    </div>
  );
};
