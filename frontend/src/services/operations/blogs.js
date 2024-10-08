import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { blogEndPoints } from "../apis";

const {
  FETCH_ALL_BLOGS,
  GET_MY_BLOGS,
  CREATE_BLOG,
  FETCH_LATEST_BLOGS,
  UPDATE_BLOG,
  DELETE_BLOG,
} = blogEndPoints;

export const fetchBlogs = async () => {
  let result;
  try {
    
    const response = await apiConnector("GET", FETCH_ALL_BLOGS);
    if (response.data.success) {
      result = response.data.blogs;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const getMyBlogs = async (token) => {
  let result;
  try {
    const response = await apiConnector("GET", GET_MY_BLOGS, null, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.success) {
      result = response?.data?.myBlogs;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const createBlog = async (body, token) => {
  try {
    const response = await apiConnector("POST", CREATE_BLOG, body, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.success) {
      return response;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchLatestBlogs = async () => {
  let result;
  try {
    const response = await apiConnector("GET", FETCH_LATEST_BLOGS);
    if (response?.data?.success) {
      result = response?.data?.Blogs;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const updateBlog = async (body, token) => {
  try {
    const response = await apiConnector("PUT", UPDATE_BLOG, body, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.success) {
      return response;
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteBlog = async (body, token) => {
  try {
    const response = await apiConnector("DELETE", DELETE_BLOG, body, {
      Authorization: `Bearer ${token}`,
    });
    if(response?.data?.success){
      return response ;
    }
  } catch (error) {
    toast.error(error?.response?.data.message);
  }
};
