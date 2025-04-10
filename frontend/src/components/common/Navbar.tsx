import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import logo from '/logo.png';
import Logout from './Logout';
import AuthorizeView from '../auth/AuthorizeView';
import ProfileDropdown from './ProfileDropDown';
import SearchBar from './Searchbar';

const CustomNavbar = ({ minimal = false }: { minimal?: boolean }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItemStyle: React.CSSProperties = {
    color: '#bbb',
    cursor: 'pointer',
    marginRight: '16px',
    fontWeight: 400,
    fontSize: '0.9rem',
    transition: 'color 0.2s ease-in-out',
  };

  return (
    <AuthorizeView>
      <BootstrapNavbar
        expand="lg"
        fixed="top"
        className="px-4 py-2"
        style={{
          backgroundColor: '#000',
          borderBottom: '2px solid #111',
          zIndex: 1000,
        }}
      >
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          {/* Logo */}
          <div className="d-flex align-items-center">
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
                style={{ height: '32px', width: '32px', objectFit: 'contain' }}
              />
              <span
                style={{
                  color: '#e50914',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  letterSpacing: '1px',
                }}
              >
                CINENICHE
              </span>
            </BootstrapNavbar.Brand>

            {/* Nav Links */}
            {!minimal && (
              <div className="d-flex align-items-center ms-4 gap-4">
                <span style={navItemStyle} onClick={() => navigate('/mylist')}>
                  My List
                </span>
                <span style={navItemStyle} onClick={() => navigate('/tv')}>
                  TV Shows
                </span>
                <span style={navItemStyle} onClick={() => navigate('/movies')}>
                  Movies
                </span>
                
              </div>
            )}
          </div>

          {/* Search + Logout */}
          <div className="d-flex align-items-center gap-3" ref={searchRef}>
            <FaSearch
              style={{ color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
              onClick={() => setShowSearch((prev) => !prev)}
            />
            {showSearch && (
              <div style={{ width: '200px', marginLeft: '8px' }}>
                <SearchBar />
              </div>
            )}

            <ProfileDropdown />
          </div>
        </Container>
      </BootstrapNavbar>
    </AuthorizeView>
  );
};

export default CustomNavbar;
