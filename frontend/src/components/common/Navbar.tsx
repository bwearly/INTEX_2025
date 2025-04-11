import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import logo from '/logo.png';
import Logout from './Logout';
import AuthorizeView from '../auth/AuthorizeView';
import ProfileDropdown from './ProfileDropDown';
import SearchBar from './Searchbar';

// Main navigation bar used throughout the app
// Displays logo, navigation links, search input, and profile dropdown
const CustomNavbar = ({ minimal = false }: { minimal?: boolean }) => {
  const navigate = useNavigate();

  // Controls whether the search bar is visible
  const [showSearch, setShowSearch] = useState(false);

  // Used to detect clicks outside of the search bar
  const searchRef = useRef<HTMLDivElement>(null);

  // Hide search bar if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Styles applied to navigation text links (e.g., TV Shows, Movies)
  const navItemStyle: React.CSSProperties = {
    color: '#6C9CB0', // Retro blue accent
    cursor: 'pointer',
    marginRight: '16px',
    fontWeight: 400,
    fontSize: '0.9rem',
    transition: 'color 0.2s ease-in-out',
  };

  return (
    // Protects this view so it's only rendered for authenticated users
    <AuthorizeView>
      <BootstrapNavbar
        expand="lg"
        fixed="top"
        className="px-4 py-2"
        style={{
          backgroundColor: '#000000', // Black background for modern look
          borderBottom: '2px solid #6C9CB0', // Blue accent underline
          zIndex: 1000, // Keeps navbar on top of other content
        }}
      >
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          {/* Left Section: Logo and optional nav links */}
          <div className="d-flex align-items-center">
            {/* CineNiche Logo - navigates to home page */}
            <BootstrapNavbar.Brand
              onClick={() => navigate('/home')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <img
                src={logo}
                alt="CineNiche Logo"
                style={{
                  height: '32px',
                  width: '32px',
                  objectFit: 'contain',
                  outline: 'none',
                  boxShadow: 'none',
                  border: 'none',
                }}
              />
              <span
                style={{
                  color: '#6C9CB0', // Matches blue theme
                  fontWeight: 'bold',
                  fontSize: '20px',
                  letterSpacing: '1px',
                }}
              >
                CINENICHE
              </span>
            </BootstrapNavbar.Brand>

            {/* Conditionally show TV Shows / Movies links unless in minimal mode */}
            {!minimal && (
              <div className="d-flex align-items-center ms-4 gap-4">
                <span style={navItemStyle} onClick={() => navigate('/tv')}>
                  TV Shows
                </span>
                <span style={navItemStyle} onClick={() => navigate('/movies')}>
                  Movies
                </span>
              </div>
            )}
          </div>

          {/* Right Section: Search, profile dropdown */}
          <div className="d-flex align-items-center gap-3" ref={searchRef}>
            {/* Search icon toggles the input field */}
            <FaSearch
              style={{
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
              onClick={() => setShowSearch((prev) => !prev)}
            />

            {/* Conditionally show search input when icon is clicked */}
            {showSearch && (
              <div style={{ width: '200px', marginLeft: '8px' }}>
                <SearchBar />
              </div>
            )}

            {/* Profile icon or dropdown - handles logout and user actions */}
            <ProfileDropdown />
          </div>
        </Container>
      </BootstrapNavbar>
    </AuthorizeView>
  );
};

export default CustomNavbar;
