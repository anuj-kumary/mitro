import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mockman from 'mockman-js';
import { Navbar } from './components';
import { Home, Profile, Signin, Signup } from './pages';
import { EditModal } from './pages';
import { Bookmark } from './pages/Bookmark/Bookmark';
import { Explore } from './pages/Explore/Explore';
import { getAllPosts } from './store/postSlice';

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

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
        <Route path='/bookmark' element={token ? <Bookmark /> : <Signin />}></Route>
        <Route path='/explore' element={<Explore />}></Route>
      </Routes>
    </>
  );
}

export default App;
