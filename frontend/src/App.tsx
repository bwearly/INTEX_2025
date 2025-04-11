import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- Page Components ---
import Home from './pages/Home/Home';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import MoviesPage from './pages/MoviesPage';
import TvShowsPage from './pages/TvShowsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

// --- Common Components ---
import Navbar from './components/common/Navbar';
import RegisterPage from './components/common/RegisterPage';
import SearchResult from './components/common/SearchResult';
import MovieDetailsPage from './components/common/MovieDetails';
import PrivacyPolicy from './components/common/PrivacyPolicy';
import Recommended from './components/common/Recommended';
import Footer from './components/common/Footer';

// --- Auth Wrapper ---
import AuthorizeView from './components/auth/AuthorizeView';

// --- Cookie Consent Banner ---
import CookieConsent from 'react-cookie-consent';

function App() {
  const location = useLocation();

  // Hide the main navbar on login and registration pages
  const hideNavbar =
    location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {/* --- Public Routes (Login/Register) --- */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* --- Conditionally Render Navbar --- */}
      {!hideNavbar && <Navbar />}

      {/* --- Authenticated View Wrapper --- */}
      <AuthorizeView>
        <Routes>
          {/* --- Authenticated Routes --- */}
          <Route path="/home" element={<Home />} />
          <Route path="/admin/movies" element={<ManageMoviesPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TvShowsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/Movie/:id" element={<MovieDetailsPage />} />
        </Routes>
      </AuthorizeView>

      {/* --- Always Rendered Footer --- */}
      <Footer />

      {/* --- Cookie Consent Banner --- */}
      <CookieConsent
        enableDeclineButton
        declineButtonText="No thanks"
        onDecline={() => {}}
        onAccept={() => {}}
      >
        We use cookies for ratings, sessions, and saving your preferences.
      </CookieConsent>
    </>
  );
}

export default App;
