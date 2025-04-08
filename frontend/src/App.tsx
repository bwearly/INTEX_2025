import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';

function App() {
  const location = useLocation();

  // Hide navbar on login page
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* ✅ Show login first */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/movies" element={<ManageMoviesPage />} />
      </Routes>
    </>
  );
}

export default App;
