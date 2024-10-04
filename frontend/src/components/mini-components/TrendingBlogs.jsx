import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export const TrendingBlogs = () => {
  const { allBlogs } = useSelector((state) => state.blog);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1005 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="w-full mt-6">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Trending All Of Time</h1>
      <Carousel responsive={responsive} className="pb-4">
        {allBlogs && allBlogs.length > 0 ? (
          allBlogs.slice(0, 6).map((blog) => (
            <div key={blog._id} className="flex gap-4 relative">
              <Link to={`/blog/${blog._id}`}>
                <img
                  className="h-64 w-64 rounded-md opacity-80 hover:scale-105 hover:opacity-100 transition-transform duration-300"
                  src={blog?.image}
                  alt={blog?.title}
                />
                <div className="absolute bottom-6 left-4 flex flex-col gap-2">
                  <div className="bg-blue-600 text-gray-100 text-sm font-semibold px-3 py-1 rounded-md w-fit">
                    {blog?.category}
                  </div>
                  <div className="text-gray-100 text-base font-bold">
                    {blog?.title.length > 32 ? `${blog?.title.substring(0, 20)}...` : blog?.title}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={blog?.image}
                      alt="author"
                      className="h-8 w-8 rounded-full border-2 border-white"
                    />
                    <p className="text-sm font-bold text-gray-200">{blog?.authorId?.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <BeatLoader size={30} color="gray-300"/>
        )}
      </Carousel>
    </div>
  );
};
