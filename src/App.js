import { Route, Routes } from 'react-router-dom';
import { Signup, Home, Signin } from './pages';
import Mockman from 'mockman-js';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/mockman' element={<Mockman />}></Route>
      </Routes>
    </>
  );
}

export default App;
