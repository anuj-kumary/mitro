import {
  createNewPostServices,
  deleteCommentsServices,
  deletePostServices,
  dislikedPostServices,
  editCommentsServices,
  editPostServices,
  getAllPostServices,
  getBookmarkPostServices,
  likedPostServices,
  postCommentsServices,
} from '../services/services';
import { editProfile } from './authenticationSlice';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getAllPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await getAllPostServices();

    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
});

export const createNewPost = createAsyncThunk('posts/newPost', async ({ post, encodedToken }) => {
  try {
    const response = await createNewPostServices(post, encodedToken);
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
});

export const editPosts = createAsyncThunk('posts/postEdit', async ({ postData, encodedToken }) => {
  try {
    const response = await editPostServices(postData, encodedToken);
    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
});

export const deletePosts = createAsyncThunk(
  'posts/postDelete',
  async ({ postId, encodedToken }) => {
    try {
      const response = await deletePostServices(postId, encodedToken);
      return response.data.posts;
    } catch (error) {
      console.log(error);
    }
  },
);

export const likedPostHandler = createAsyncThunk(
  'posts/likedPost',
  async ({ postId, encodeToken }) => {
    try {
      const response = await likedPostServices(postId, encodeToken);
      return response.data.posts;
    } catch (error) {
      console.error(error);
    }
  },
);
export const dislikedPostHandler = createAsyncThunk(
  'posts/dislikedPost',
  async ({ postId, encodeToken }) => {
    try {
      const response = await dislikedPostServices(postId, encodeToken);
      return response.data.posts;
    } catch (error) {
      console.error(error);
    }
  },
);

export const postCommentsHandler = createAsyncThunk(
  'posts/postComments',
  async ({ postId, commentData, encodeToken }) => {
    try {
      const response = await postCommentsServices(postId, commentData, encodeToken);
      return response.data.posts;
    } catch (error) {
      console.error(error);
    }
  },
);
export const editCommentsHandler = createAsyncThunk(
  'posts/editComments',
  async ({ postId, commentId, commentData, encodedToken }) => {
    try {
      const response = await editCommentsServices(postId, commentId, commentData, encodedToken);
      return response.data.posts;
    } catch (error) {
      console.error(error);
    }
  },
);

export const deleteCommentsHandler = createAsyncThunk(
  'posts/deleteComments',
  async ({ postId, commentId, encodedToken }) => {
    try {
      const response = await deleteCommentsServices(postId, commentId, encodedToken);
      return response.data.posts;
    } catch (error) {
      console.error(error);
    }
  },
);

export const getBookmarkPost = createAsyncThunk('posts/getBookmark', async () => {
  try {
    const response = await getBookmarkPostServices();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    postSorting: 'LATEST',
  },
  reducers: {
    sortByTrendingAndLatest: (state, action) => {
      console.log(action.payload);
      state.postSorting = action.payload;
    },
  },
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
    [likedPostHandler.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [likedPostHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [dislikedPostHandler.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [dislikedPostHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [postCommentsHandler.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [postCommentsHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [editCommentsHandler.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [editCommentsHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [deleteCommentsHandler.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [deleteCommentsHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
  },
});

export const postReducer = postSlice.reducer;
export const { sortByTrendingAndLatest } = postSlice.actions;
