import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const Footer: React.FC = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const isLoginPage =
    location.pathname === '/' || location.pathname === '/login';

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLoginPage) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <>
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
          onClick={handlePrivacyClick}
          style={{ color: '#5dade2', textDecoration: 'underline' }}
        >
          Privacy Policy
        </a>
      </footer>

      {showModal && <PrivacyPolicyModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Footer;
