import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './authenticationSlice';
import { postReducer } from './postSlice';

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    posts: postReducer,
  },
});
