import {
  bookmarkPostServices,
  editProfileServices,
  removeBookmarkPostServices,
  signinServices,
  signupServices,
} from '../services/services';
import { ToastHandler } from '../utils/toastutils';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  token: JSON.parse(localStorage.getItem('login'))?.token,
  user: JSON.parse(localStorage.getItem('login'))?.user,
};

export const signinHandler = createAsyncThunk(
  'auth/signinHandler',
  async ({ username, password, navigate }) => {
    try {
      const response = await signinServices(username, password);
      navigate('/home');
      return response.data;
    } catch (error) {
      ToastHandler('error', 'Username or Password are incorrect');
      console.error(error);
    }
  },
);

export const signupHandler = createAsyncThunk(
  'auth/signupHandler',
  async ({ username, password, firstName, lastName, navigate }) => {
    try {
      const response = await signupServices(username, password, firstName, lastName);
      navigate('/home');
      return response.data;
    } catch (error) {
      ToastHandler('error', 'Couldn"t Signup! Please try again');
      console.error(error);
    }
  },
);

export const editProfile = createAsyncThunk('profile/userDetails', async (userData) => {
  try {
    const response = await editProfileServices(userData.userDetails, userData.token);
    console.log(response);
    return response.data.user;
  } catch (error) {
    console.error(error);
  }
});

export const bookmarkPostHandler = createAsyncThunk(
  'auth/bookmarkPost',
  async ({ postId, encodeToken }) => {
    try {
      const response = await bookmarkPostServices(postId, encodeToken);
      ToastHandler('success', 'Added to bookmark');
      return response.data.bookmarks;
    } catch (error) {
      console.error(error);
    }
  },
);

export const removeBookmarkHandler = createAsyncThunk(
  'auth/removeBookmarkPost',
  async ({ postId, encodeToken }) => {
    try {
      const response = await removeBookmarkPostServices(postId, encodeToken);
      ToastHandler('success', 'Removed from bookmark');
      return response.data.bookmarks;
    } catch (error) {
      console.error(error);
    }
  },
);

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutHandler: (state) => {
      localStorage.removeItem('login');
      state.token = null;
      state.user = null;
      ToastHandler('success', 'Successfully Logged Out');
    },
  },
  extraReducers: {
    [signinHandler.fulfilled]: (state, action) => {
      state.user = action.payload.foundUser;
      state.token = action.payload.encodedToken;
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.foundUser,
        }),
      );
      ToastHandler('success', 'Successfully Logged In');
    },
    [signinHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [signupHandler.fulfilled]: (state, action) => {
      state.user = action.payload.createdUser;
      state.token = action.payload.encodedToken;
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.createdUser,
        }),
      );
    },
    [signupHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [editProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [editProfile.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [bookmarkPostHandler.fulfilled]: (state, action) => {
      state.user.bookmarks = action.payload;
    },
    [bookmarkPostHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [removeBookmarkHandler.fulfilled]: (state, action) => {
      state.user.bookmarks = action.payload;
    },
    [removeBookmarkHandler.rejected]: (state, action) => {
      console.error(action.payload);
    },
  },
});
export const { logoutHandler } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
