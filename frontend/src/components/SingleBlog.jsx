import axios from "axios";
import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleBlog } from "../redux/slice/blog";

export const SingleBlog = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const { singleBlog } = useSelector((state) => state?.blog);
  const dispatch = useDispatch();

  console.log(singleBlog);
  const fetchSingleBlog = async () => {
    try {
      const response = await axios.get(
        `https://dev-diaries-xnjy.onrender.com/api/v1/blog/singleBlog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        dispatch(setSingleBlog(response?.data?.blog));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-11/12 md:w-9/12 mx-auto text-gray-300 flex flex-col gap-6 md:py-8 py-2">
      {/* Blog Category */}
      <div className="bg-gray-900 text-blue-500 px-4 py-2 w-fit rounded-md font-bold">
        {singleBlog?.category}
      </div>

      {/* Author Section */}
      <div className="flex flex-row gap-4 items-center mb-4">
        <img
          src={singleBlog?.authorId?.profilePicture}
          className="h-12 w-12 rounded-full object-fit"
          alt="Author"
        />
        <h1 className="text-lg font-semibold">{singleBlog?.authorId?.name}</h1>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col gap-8">
        {/* Blog Section One */}
        {singleBlog && (
          <div className="flex flex-col gap-4">
            <img
              src={singleBlog?.image}
              className="rounded-md shadow-md object-fit w-full max-h-80"
              alt="Blog"
            />
            <h1 className="text-3xl font-bold tracking-wide text-gray-100">
              {singleBlog?.title}
            </h1>
            <p className="text-gray-400 text-base">{singleBlog?.description}</p>
          </div>
        )}

        {/* Blog Section Two */}
        {singleBlog?.imageTwo !== null && (
          <div className="flex flex-col gap-4">
            <img
              src={singleBlog?.imageTwo}
              className="rounded-md shadow-md object-fit w-full max-h-80"
              alt="Blog"
            />
            <h1 className="text-3xl font-bold tracking-wide text-gray-100">
              {singleBlog?.titleTwo}
            </h1>
            <p className="text-gray-400 text-base">
              {singleBlog?.descriptionTwo}
            </p>
          </div>
        )}

        {/* Blog Section Three */}
        {singleBlog?.imageThree !== null && (
          <div className="flex flex-col gap-4">
            <img
              src={singleBlog?.imageThree}
              className="rounded-md shadow-md object-fit w-full max-h-80"
              alt="Blog"
            />
            <h1 className="text-3xl font-bold tracking-wide text-gray-100">
              {singleBlog?.titleThree}
            </h1>
            <p className="text-gray-400 text-base">
              {singleBlog?.descriptionThree}
            </p>
          </div>
        )}

        {/* Blog Section Four */}
        {singleBlog?.imageFour !== null && (
          <div className="flex flex-col gap-4">
            <img
              src={singleBlog?.imageFour}
              className="rounded-md shadow-md object-fit w-full max-h-80"
              alt="Blog"
            />
            <h1 className="text-3xl font-bold tracking-wide text-gray-100">
              {singleBlog?.titleFour}
            </h1>
            <p className="text-gray-400 text-base">
              {singleBlog?.descriptionFour}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
