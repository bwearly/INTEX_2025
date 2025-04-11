import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowModal(true);
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
          onClick={handlePrivacyClick}
          style={{ color: '#5dade2', textDecoration: 'underline' }}
        >
          Privacy Policy
        </a>
      </footer>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#000000', // true black
              color: '#f9fafb',
              padding: '2rem',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: '#f9fafb',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            {/* Privacy Policy Content */}
            <h2>Privacy Policy</h2>
            <p>Effective Date: April 2025</p>
            <p>
              At <strong>CineNiche</strong>, your privacy is important to us.
              This Privacy Policy explains how we collect, use, and protect your
              personal data when you use our platform. We are committed to
              complying with the General Data Protection Regulation (GDPR).
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              When you use CineNiche, we may collect the following information:
            </p>
            <ul>
              <li>Your name and email address when you register an account</li>
              <li>
                Your preferences and interactions (e.g., movie ratings, search
                history)
              </li>
              <li>
                Session data and cookies used to manage secure login sessions
              </li>
            </ul>

            <h3>2. How We Use Your Data</h3>
            <ul>
              <li>
                To personalize your experience and provide relevant movie
                recommendations
              </li>
              <li>To manage your user account and allow login functionality</li>
              <li>To monitor site usage and improve our services</li>
            </ul>

            <h3>3. Legal Basis for Processing</h3>
            <ul>
              <li>Your consent, given when you sign up and accept cookies</li>
              <li>Our legitimate interest in improving user experience</li>
              <li>Our legal obligations to maintain account security</li>
            </ul>

            <h3>4. Data Sharing and Storage</h3>
            <p>
              We do not sell or share your personal data with third parties.
              Your data is stored securely and only accessible to authorized
              members of the CineNiche team. External services like YouTube may
              process your requests (e.g., trailer lookups), but your personal
              data is not shared.
            </p>

            <h3>5. Cookies and Tracking</h3>
            <p>
              We use cookies to manage sessions and remember your preferences.
              You can accept or reject cookie usage. No tracking cookies are
              used without consent.
            </p>

            <h3>6. Your Rights Under GDPR</h3>
            <ul>
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>File a complaint with a supervisory authority</li>
            </ul>

            <h3>7. Data Retention</h3>
            <p>
              We retain your data while your account is active. If you delete
              your account or request removal, we delete your data within 30
              days.
            </p>

            <h3>8. Contact Us</h3>
            <p>
              For questions or data requests, contact us at:
              <br />
              <strong>Email:</strong> privacy@cineniche.com
            </p>

            <p>Thank you for trusting CineNiche.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
