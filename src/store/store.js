import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './authenticationSlice';

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
  },
});
