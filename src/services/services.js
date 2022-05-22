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
    },
  );

export const editPostServices = (postData, authorization) =>
  axios.post(
    `/api/posts/edit/${postData._id}`,
    { postData },
    {
      headers: {
        authorization,
      },
    },
  );

export const deletePostServices = (postId, authorization) =>
  axios.delete(`/api/posts/${postId}`, {
    headers: {
      authorization,
    },
  });

export const likedPostServices = (postId, authorization) =>
  axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: {
        authorization,
      },
    },
  );

export const dislikedPostServices = (postId, authorization) =>
  axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: {
        authorization,
      },
    },
  );

export const getBookmarkPostServices = (authorization) =>
  axios.get('/api/users/bookmark/', {
    headers: {
      authorization,
    },
  });

export const bookmarkPostServices = (postId, authorization) =>
  axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: {
        authorization,
      },
    },
  );

export const getCommentsServices = (postId, authorization) =>
  axios.get(`/api/comments/${postId}`, {
    headers: {
      authorization,
    },
  });

export const postCommentsServices = (postId, commentData, authorization) =>
  axios.post(
    `/api/comments/add/${postId}`,
    { commentData },
    {
      headers: {
        authorization,
      },
    },
  );

export const editCommentsServices = (postId, commentId, commentData, authorization) =>
  axios.post(
    `/api/comments/edit/${postId}/${commentId}`,
    { commentData },
    {
      headers: {
        authorization,
      },
    },
  );

export const deleteCommentsServices = (postId, commentId, authorization) =>
  axios.delete(`/api/comments/delete/${postId}/${commentId}`, {
    headers: {
      authorization,
    },
  });

export const removeBookmarkPostServices = (postId, authorization) =>
  axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: {
        authorization,
      },
    },
  );

export const editProfileServices = (userData, authorization) =>
  axios.post(
    '/api/users/edit',
    { userData },
    {
      headers: {
        authorization,
      },
    },
  );

export const followUserServices = (followUserId, authorization) =>
  axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    {
      headers: {
        authorization,
      },
    },
  );
export const unfollowServices = (followUserId, authorization) =>
  axios.post(
    `/api/users/unfollow/${followUserId}`,
    {},
    {
      headers: {
        authorization,
      },
    },
  );

export const getAllUsersServices = () => axios.get('/api/users');

export const getUserServices = (username) => axios.get(`/api/users/${username}`);

export const getUserPostServices = (username) => axios.get(`/api/posts/user/${username}`);
