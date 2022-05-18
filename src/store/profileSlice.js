import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserServices } from '../services/services';

export const userDetails = createAsyncThunk('profile/userDetails', async (userId) => {
  try {
    const response = await getUserServices(userId);
    return response.data.user;
  } catch (error) {
    console.log(error);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileDetails: null,
  },
  reducers: {},
  extraReducers: {
    [userDetails.fulfilled]: (state, action) => {
      state.profileDetails = action.payload;
    },
    [userDetails.rejected]: (state, action) => {
      console.error(action.payload);
    },
  },
});

export const profileReducers = profileSlice.reducer;
