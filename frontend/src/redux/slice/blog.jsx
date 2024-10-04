import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs : [] ,
  singleBlog : null ,
  myBlogs :[] ,
  latestBlogs : [] ,
  fetchBlogById : null
};

const blogSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
    } ,
    setSingleBlog : (state,action)=>{
      state.singleBlog = action.payload;
    } ,
    setMyBlogs : (state,action)=>{
      state.myBlogs = action.payload
    },
    setLatestBlogs : (state,action)=>{
      state.latestBlogs = action.payload
    },
    setFetchBlogById : (state,action)=>{
      state.fetchBlogById = action.payload
    }
  },
});

export const { setAllBlogs , setSingleBlog , setMyBlogs , setLatestBlogs , setFetchBlogById} = blogSlice.actions;
export default blogSlice.reducer;
