import React from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png';
const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top px-4 py-2 shadow-sm">
      <div className="d-flex align-items-center">
        <img src={logo} alt="CineNiche Logo" height="30" className="me-2" />
        <span className="fw-bold text-danger fs-4 me-4">CINENICHE</span>
      </div>
      {/* LEFT SIDE NAV LINKS */}
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
      {/* RIGHT SIDE ICONS */}
      <div className="ms-auto d-flex gap-3 align-items-center">
        <FaSearch className="text-white" size={18} />
        <FaUserCircle className="text-white" size={22} />
      </div>
    </nav>
  );
};
export default Navbar;
