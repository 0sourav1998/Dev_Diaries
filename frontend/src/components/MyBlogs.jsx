import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getMyBlogs } from "../services/operations/blogs";
import { setMyBlogs } from "../redux/slice/blog";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

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

  const handleDelete = async (id) => {
    const result = await deleteBlog({ id: id }, token);
    console.log(result);
    if (result?.data?.success) {
      const updatedBlogs = myBlogs?.filter(
        (blog) => blog?._id !== result?.data?.deleteBlog?._id
      );
      dispatch(setMyBlogs(updatedBlogs));
      toast.success("Blog Deleted");
    }
  };

  return (
    <div className="w-full">
      <h1 className="md:text-3xl text-xl font-extrabold mb-6 text-gray-100">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-transform transform cursor-pointer hover:shadow-2xl hover:bg-gray-700"
            >
              <img
                src={blog?.image}
                alt={blog?.title}
                className="object-cover md:h-52 h-36 w-full"
              />
              <div className="flex flex-col">
                <div className="lg:p-5 p-3">
                  <h2 className="md:text-xl md:font-bold text-xs font-semibold text-gray-200 hover:text-blue-400">
                    {blog?.title}
                  </h2>
                  <p className="text-gray-300 mt-3 lg:text-lg text-xs">
                    {blog?.description.length > 60
                      ? blog?.description.substring(0, 60) + "..."
                      : blog?.description}
                  </p>
                </div>
                <div className="flex md:gap-4 gap-2 w-full p-2">
                  <Link to={`/blog/${blog._id}`} className="w-full">
                    <button className="md:p-2 p-1 md:text-normal text-xs bg-blue-700 rounded-md w-full text-white hover:bg-blue-800 transition-all duration-300">
                      View
                    </button>
                  </Link>

                  <Link to={`/dashboard/update/${blog._id}`} className="w-full">
                    <button className="md:p-2 p-1 md:text-normal text-xs bg-yellow-700 rounded-md w-full text-white hover:bg-yellow-800 transition-all duration-300">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="md:p-2 p-1 md:text-normal text-xs bg-red-700 rounded-md w-full text-white hover:bg-red-800 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No Blogs Found</p>
        )}
      </div>
    </div>
  );
};
