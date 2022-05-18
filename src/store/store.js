import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './authenticationSlice';
import { postReducer } from './postSlice';
import { profileReducers } from './profileSlice';

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    posts: postReducer,
    profile: profileReducers,
  },
});
