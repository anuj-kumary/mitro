import axios from 'axios';

export const signinServices = async (username, password) =>
  await axios.post('/api/auth/login', {
    username,
    password,
  });

export const signupServices = async (username, password, firstName, lastName) =>
  await axios.post('/api/auth/signup', {
    username,
    password,
    firstName,
    lastName,
  });

export const getAllPostServices = () => axios.get('/api/posts');

export const createNewPostServices = (postData, authorization) =>
  axios.post(
    '/api/posts',
    { postData },
    {
      headers: {
        authorization,
      },
    }
  );

export const editPostServices = (postData, authorization) =>
  axios.post(
    `/api/posts/edit/${postData._id}`,
    { postData },
    {
      headers: {
        authorization,
      },
    }
  );

export const deletePostServices = (postId, authorization) =>
  axios.delete(`/api/posts/${postId}`, {
    headers: {
      authorization,
    },
  });
