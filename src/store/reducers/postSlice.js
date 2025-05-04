import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.list = action.payload;
    },

    updatePost: (state, action) => {
      const updatedPostIndex = state.list.findIndex(
        (post) => post.id === action.payload.id
      );
      if (updatedPostIndex !== -1) {
        state.list[updatedPostIndex] = action.payload;
      }
    },
  },
});

export const { setPosts, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
