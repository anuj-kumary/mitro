import axios from 'axios';

export const loginServices = async (email, password) =>
  await axios.post('/api/auth/login', {
    email,
    password,
  });

export const signupServices = async (email, password, firstName, lastName) =>
  await axios.post('/api/auth/signup', {
    email,
    password,
    firstName,
    lastName,
  });
