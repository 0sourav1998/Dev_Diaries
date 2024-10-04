import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: null ,
  allAuthors : []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAllAuthors : (state,action)=>{
      state.allAuthors = action.payload
    }
  },
});

export const { setToken, setUser , setAllAuthors} = userSlice.actions;
export default userSlice.reducer;
