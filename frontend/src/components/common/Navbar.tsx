import React from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 py-2">
      <div className="d-flex align-items-center">
        <img src={logo} alt="CineNiche Logo" height="30" className="me-2" />
        <span className="fw-bold text-danger fs-4 me-4">CINENICHE</span>

        {/* LEFT SIDE NAV LINKS */}
        <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
          <li className="nav-item">
            <a href="#" className="nav-link">My List</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">TV Shows</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Movies</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Categories</a>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE ICONS */}
      <div className="ms-auto d-flex align-items-center gap-3 text-white fs-5">
        <span className="cursor-pointer"><FaSearch /></span>
        <span className="cursor-pointer"><FaUserCircle /></span>
      </div>
    </nav>
  );
};

export default Navbar;

