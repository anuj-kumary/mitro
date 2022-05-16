import {
  getAllPostServices,
  deletePostServices,
  editPostServices,
  createNewPostServices,
} from '../services/services';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAllPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await getAllPostServices();
    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
});

export const createNewPost = createAsyncThunk(
  'new/newPost',
  async ({ post, encodedToken }) => {
    try {
      const response = await createNewPostServices(post, encodedToken);
      return response.data.posts;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editPosts = createAsyncThunk(
  'edit/postEdit',
  async ({ postData, encodedToken }) => {
    console.log(postData);
    try {
      const response = await editPostServices(postData, encodedToken);
      return response.data.posts;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deletePosts = createAsyncThunk(
  'posts/postDelete',
  async ({ postId, encodedToken }) => {
    try {
      const response = await deletePostServices(postId, encodedToken);
      return response.data.posts;
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: {
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [createNewPost.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [editPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [editPosts.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [deletePosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [deletePosts.rejected]: (state, action) => {
      console.error(action.payload);
    },
  },
});

export const postReducer = postSlice.reducer;
