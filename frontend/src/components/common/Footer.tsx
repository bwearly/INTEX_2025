import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import { UserContext } from '../auth/AuthorizeView';

const Footer: React.FC = () => {
  const location = useLocation();
  const user = useContext(UserContext);
  const isAuthenticated = !!user;
  const [showModal, setShowModal] = useState(false);

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAuthenticated) {
      e.preventDefault();
      setShowModal(true);
    }
  };

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
        onClick={handlePrivacyClick}
        style={{ color: '#5dade2', textDecoration: 'underline' }}
      >
        Privacy Policy
      </a>
      <PrivacyPolicyModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </footer>
  );
};

export default Footer;
