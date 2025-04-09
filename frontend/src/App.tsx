import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import Navbar from './components/common/Navbar';
// import LoginPage from './pages/LoginPage';
import RegisterPage from './components/common/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  const location = useLocation();
  //const hideNavbar = location.pathname === '/login';
  return (
    <>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />{' '}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/movies" element={<ManageMoviesPage />} />
      </Routes>
    </>
  );
}
export default App;
