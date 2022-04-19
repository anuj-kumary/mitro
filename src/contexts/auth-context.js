import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginServices, signupServices } from '../services/services';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem('login'));
  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem('login'));
  const [user, setUser] = useState(localStorageUser?.user);
  const navigate = useNavigate();

  const loginHandler = async (e, login, setLogin) => {
    e.preventDefault();

    let response;
    if (e.target.innerText === 'SIGN IN AS GUEST') {
      setLogin({
        email: 'adarshbalak@gmail.com',
        password: 'adarshBalaki123',
      });
      response = await loginServices(
        'adarshbalak@gmail.com',
        'adarshBalaki123'
      );
    } else {
      response = await loginServices(login.email, login.password);
    }
    if (response.status === 200) {
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: response.data.encodedToken,
          user: response.data.foundUser,
        })
      );
      setUser(response.data.foundUser);
      setToken(response.data.encodedToken);
      navigate('/home');
    }
  };

  const signupHandler = async (email, password, firstName, lastName) => {
    const response = await signupServices(email, password, firstName, lastName);
    if (response.status === 201) {
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: response.data.encodedToken,
          user: response.data.createdUser,
        })
      );
      setUser(response.data.createdUser);
      setToken(response.data.encodedToken);
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ loginHandler, signupHandler, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
