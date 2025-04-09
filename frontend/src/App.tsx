import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import Navbar from './components/common/Navbar';
import RegisterPage from './components/common/RegisterPage';
import LoginPage from './pages/LoginPage';
import SearchResult from './components/common/SearchResult'; 
import CookieConsent from 'react-cookie-consent';

function App() {
  const location = useLocation();
  // const hideNavbar = location.pathname === '/login';

  return (
    <>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/movies" element={<ManageMoviesPage />} />
        <Route path="/search" element={<SearchResult />} /> 
      </Routes>
      <CookieConsent
        enableDeclineButton
        declineButtonText="No thanks"
        onDecline={() => {
          console.log('User declined cookies');
        }}
        onAccept={() => {
          console.log('User accepted cookies');
        }}
      >
        We use cookies for ratings, sessions, and saving your preferences.
      </CookieConsent>
    </>
  );
}

export default App;

