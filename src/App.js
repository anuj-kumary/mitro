import { Route, Routes } from 'react-router-dom';
import { Signup, Home, Signin, Profile } from './pages';
import Mockman from 'mockman-js';
import { Navbar } from './components';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/mockman' element={<Mockman />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
