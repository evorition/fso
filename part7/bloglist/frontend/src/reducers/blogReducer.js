import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (object) => {
  return async (dispatch) => {
    const blog = await blogService.create(object);
    dispatch(addBlog(blog));
  };
};

export const { setBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
