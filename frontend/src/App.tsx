import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
<<<<<<< HEAD
import RegisterPage from './pages/RegisterPage';
=======

>>>>>>> parent of e049087 (added a ton of security and cookies)
function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />{' '}
        <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
        <Route path="/registerPage" element={<RegisterPage />} />
=======
>>>>>>> parent of e049087 (added a ton of security and cookies)
        <Route path="/home" element={<Home />} />
        <Route path="/admin/movies" element={<ManageMoviesPage />} />
      </Routes>
    </>
  );
}
export default App;
