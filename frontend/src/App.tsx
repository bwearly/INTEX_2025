import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import Navbar from './components/common/Navbar';
import RegisterPage from './components/common/RegisterPage';
import LoginPage from './pages/LoginPage';
import CookieConsent from 'react-cookie-consent';
import SearchResult from './components/common/SearchResult';
import MyListPage from './pages/MyRatingsPage';
import MoviesPage from './pages/MoviesPage';
import TvShowsPage from './pages/TvShowsPage';

import SettingsPage from './pages/SettingsPage';
import PrivacyPolicy from './components/common/PrivacyPolicy';
import AuthorizeView from './components/auth/AuthorizeView';
import Recommended from './components/common/Recommended';
import MovieDetailsPage from './components/common/MovieDetails';
import MyRatingsPage from './pages/MyRatingsPage';

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/' ||
    location.pathname === '/register';

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {!hideNavbar && <Navbar />}{' '}
      <AuthorizeView>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin/movies" element={<ManageMoviesPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/myRatings" element={<MyRatingsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TvShowsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </AuthorizeView>
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
