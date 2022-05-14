import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Signup, Home, Signin } from './pages';
import Mockman from 'mockman-js';
import { useSelector } from 'react-redux';

function App() {
  const { token } = useSelector((state) => state.auth);
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
      <Routes>
        <Route path='/' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={token ? <Home /> : <Signin />}></Route>
        <Route path='/mockman' element={<Mockman />}></Route>
      </Routes>
    </>
  );
}

export default App;
