import React, { useEffect, useState } from "react";
import { HeroSection } from "./mini-components/HeroSection";
import { LatestBlogs } from "./mini-components/LatestBlogs";
import { LatestAuthors } from "./mini-components/LatestAuthors";
import { TrendingBlogs } from "./mini-components/TrendingBlogs";
import { fetchBlogs } from "../services/operations/blogs";
import { useDispatch } from "react-redux";
import { setAllBlogs } from "../redux/slice/blog";
import { Footer } from "./common/Footer";
import { ClipLoader } from "react-spinners";

export const Homepage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const fetchBlog = async () => {
    try {
      setLoading(true);
      const result = await fetchBlogs();
      if (result) {
        dispatch(setAllBlogs(result));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  if (loading) {
    return (
      <div className="text-center">
        <ClipLoader
          color={"green"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="sm:w-9/12 w-full flex flex-col justify-center items-center mx-auto">
      <HeroSection />
      <TrendingBlogs />
      <LatestBlogs />
      <LatestAuthors />
      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
};
