import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mockman from 'mockman-js';
import { useDispatch, useSelector } from 'react-redux';
import { Signup, Home, Signin, Profile } from './pages';
import { Navbar } from './components';
import { useEffect } from 'react';
import { getAllPosts } from './store/postSlice';
import { EditModal } from './pages';

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [token]);

  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        theme='colored'
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <Navbar />

      <Routes>
        <Route path='/' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={token ? <Home /> : <Signin />}></Route>
        <Route path='/mockman' element={<Mockman />}></Route>
        <Route path='/profile/:username' element={<Profile />}></Route>
        <Route path='/edit' element={<EditModal />}></Route>
      </Routes>
    </>
  );
}

export default App;
