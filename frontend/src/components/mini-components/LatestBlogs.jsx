import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {fetchLatestBlogs} from "../../services/operations/blogs"
import { setLatestBlogs } from "../../redux/slice/blog";

export const LatestBlogs = () => {
  const { allBlogs,latestBlogs } = useSelector((state) => state?.blog);
  const dispatch = useDispatch();
  const fetchLatest = async()=>{
    try {
      const result = await fetchLatestBlogs();
      if(result){
        dispatch(setLatestBlogs(result))
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    fetchLatest();
  },[latestBlogs])
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-100 mb-6 w-full flex justify-start">
        Latest Blogs
      </h1>
      <div className="w-full grid grid-cols-1 xl:grid-cols-2">
        {latestBlogs && latestBlogs.length > 0 ? (
          latestBlogs?.slice(0,4)?.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog._id}`}>
              <div className="text-gray-100 sm:mr-4 mb-4">
                <div className="bg-gray-950 w-full flex lg:flex-row flex-col gap-6 rounded-md p-4 shadow-xl hover:opacity-70 cursor-pointer hover:scale-105 transition-all duration-300">
                  <img
                    className="h-48 lg:w-40 w-full object-fit"
                    src={blog?.image}
                    alt={blog.title}
                  />
                  <div className="flex flex-col gap-4">
                  <div className="w-fit bg-gray-700 text-blue-500 rounded-md px-3 py-1 font-bold">{blog?.category}</div>
                    <h1 className="text-lg  font-bold text-gray-300">
                      Title : {blog?.title.length > 30 ? blog.title.substring(0,30) + "..." : blog.title}
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
          <BeatLoader size={30} color="gray-300"/>
        )}
      </div>
    </>
  );
};
