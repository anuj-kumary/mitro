import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { followUserServices, getAllUsersServices, unfollowServices } from '../services/services';
import { editProfile } from './authenticationSlice';

export const getAllUser = createAsyncThunk('user/getAllUser', async () => {
  const response = await getAllUsersServices();
  return response.data.users;
});

export const followUser = createAsyncThunk(
  'users/followUser',
  async ({ followUserId, authToken, dispatch }) => {
    const response = await followUserServices(followUserId, authToken);
    console.log(response);
    dispatch(editProfile({ userDetails: response.data.user, token: authToken }));
    return response.data;
  },
);

export const unfollowUser = createAsyncThunk('users/unfollowUser', async () => {
  const response = unfollowServices();
  console.log(response);
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: {
    [getAllUser.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getAllUser.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [followUser.fulfilled]: (state, action) => {
      state.users = state.users.map((user) =>
        action.payload.followUser.username === user.username ? action.payload.followUser : user,
      );
    },
    [followUser.rejected]: (state, action) => {
      console.error(action.payload);
    },
  },
});

export const userReducers = userSlice.reducer;