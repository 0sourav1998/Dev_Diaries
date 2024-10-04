import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/user.jsx"
import blogReducer from "../slice/blog.jsx"

export const rootReducer = combineReducers({
    user : userReducer ,
    blog : blogReducer
})

