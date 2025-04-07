import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png';



const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4 py-2">
      <Link to="/" className="navbar-brand d-flex align-items-center text-white">
        <img src={logo} alt="CineNiche" height="30" className="me-2" />
        <span className="fw-bold">CINENICHE</span>
      </Link>

      <div className="collapse navbar-collapse">
        {/* LEFT SIDE NAV LINKS */}
        <ul className="navbar-nav ms-4 mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">My List</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">TV Shows</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Categories</Link>
          </li>
        </ul>

        {/* RIGHT SIDE ICONS */}
        <div className="d-flex align-items-center gap-3 ms-auto text-white fs-5">
          <span className="cursor-pointer"><FaSearch /></span>
          <span className="cursor-pointer"><FaUserCircle /></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
