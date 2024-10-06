import React, { useEffect } from "react";
import { HeroSection } from "./mini-components/HeroSection";
import { LatestBlogs } from "./mini-components/LatestBlogs";
import { LatestAuthors } from "./mini-components/LatestAuthors";
import { TrendingBlogs } from "./mini-components/TrendingBlogs";
import { fetchBlogs } from "../services/operations/blogs";
import { useDispatch } from "react-redux";
import { setAllBlogs } from "../redux/slice/blog";

export const Homepage = () => {
  const dispatch = useDispatch();
  const fetchBlog = async () => {
    const result = await fetchBlogs();
    dispatch(setAllBlogs(result));
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <div className="sm:w-9/12 w-full mx-auto flex flex-col justify-between items-center">
      <HeroSection />
      <TrendingBlogs />
      <LatestBlogs />
      <LatestAuthors />
    </div>
  );
};
