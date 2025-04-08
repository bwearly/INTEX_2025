import React, { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png';
import Logout from './Logout';
import AuthorizeView from '../auth/AuthorizeView';

const Navbar: React.FC = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearchBar(false);
      setQuery('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top px-4 py-2 shadow-sm">
      <div className="d-flex align-items-center">
        <img src={logo} alt="CineNiche Logo" height="30" className="me-2" />
        <span className="fw-bold text-danger fs-4 me-4">CINENICHE</span>
      </div>

      <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
        <li className="nav-item">
          <a href="#" className="nav-link">
            My List
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            TV Shows
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Movies
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Categories
          </a>
        </li>
      </ul>

      <div className="ms-auto position-relative">
        {/* ICONS */}
        <div className="d-flex align-items-center gap-3">
          <FaSearch
            className="text-white"
            size={18}
            style={{ cursor: 'pointer' }}
            onClick={() => setShowSearchBar((prev) => !prev)}
          />
          <FaUserCircle className="text-white" size={22} />
        </div>

        {/* POPUP SEARCH FORM */}
        {showSearchBar && (
          <form
            onSubmit={handleSearchSubmit}
            className="position-absolute end-0 mt-2 bg-white p-2 rounded shadow"
            style={{ zIndex: 99, width: '250px' }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </form>
        )}
        <span>
          <AuthorizeView>
            <Logout>Logout</Logout>
          </AuthorizeView>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
