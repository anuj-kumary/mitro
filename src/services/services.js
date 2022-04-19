import axios from 'axios';

export const loginServices = async (username, password) =>
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
