import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/login') return null;

  return (
    <footer
      className="footer"
      style={{ textAlign: 'center', padding: '1rem', color: '#ccc' }}
    >
      <p>&copy; 2025 CineNiche</p>
      <a href="/privacy" style={{ color: '#5dade2', textDecoration: 'underline' }}>
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
