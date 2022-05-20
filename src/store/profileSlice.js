import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserPostServices, getUserServices } from '../services/services';

export const userDetails = createAsyncThunk('profile/userDetails', async (username) => {
  try {
    const response = await getUserServices(username);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
});

export const getUserPosts = createAsyncThunk('profile/getUserPost', async (username) => {
  try {
    const response = await getUserPostServices(username);
    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileDetails: null,
    postDetails: [],
    currentUser: {},
  },
  reducers: {},
  extraReducers: {
    [userDetails.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [userDetails.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.postDetails = action.payload;
    },
    [getUserPosts.rejected]: (state, action) => {
      console.error(action.payload);
    },
  },
});

export const profileReducers = profileSlice.reducer;
