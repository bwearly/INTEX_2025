import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  // Footer is shown on all routes by default
  return (
    <footer
      className="footer"
      style={{
        textAlign: 'center',
        padding: '1rem',
        color: '#ccc',
        backgroundColor: '#000',
      }}
    >
      <p>&copy; 2025 CineNiche</p>
      <a
        href="/privacy"
        style={{ color: '#5dade2', textDecoration: 'underline' }}
      >
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
