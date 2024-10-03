import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/user.jsx"

export const rootReducer = combineReducers({
    user : userReducer
})

