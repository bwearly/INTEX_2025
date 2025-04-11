import React from 'react';

const PrivacyPolicy: React.FC = () => {
  // Check if the user is logged in by looking for a session cookie or token
  const isLoggedIn =
    document.cookie.includes('session=') || localStorage.getItem('token');

  return (
    <div
      className="privacy-policy"
      style={{
        padding: '2rem',
        paddingTop: '80px', // Space for fixed navbar
        color: '#fff',
        backgroundColor: '#000',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Show back button if user is not logged in */}
      {!isLoggedIn && (
        <button
          onClick={() => (window.location.href = '/')}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: '#6C9CB0',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          ← Back to Login
        </button>
      )}

      {/* Privacy Policy Content */}
      <h1>Privacy Policy</h1>
      <p>Effective Date: April 2025</p>

      <p>
        At <strong>CineNiche</strong>, your privacy is important to us. This
        Privacy Policy explains how we collect, use, and protect your personal
        data when you use our platform. We are committed to complying with the
        General Data Protection Regulation (GDPR).
      </p>

      <h2>1. Information We Collect</h2>
      <p>When you use CineNiche, we may collect the following information:</p>
      <ul>
        <li>Your name and email address when you register an account</li>
        <li>
          Your preferences and interactions (e.g., movie ratings, search
          history)
        </li>
        <li>Session data and cookies used to manage secure login sessions</li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>
          To personalize your experience and provide relevant movie
          recommendations
        </li>
        <li>To manage your user account and allow login functionality</li>
        <li>To monitor site usage and improve our services</li>
      </ul>

      <h2>3. Legal Basis for Processing</h2>
      <ul>
        <li>Your consent, given when you sign up and accept cookies</li>
        <li>Our legitimate interest in improving user experience</li>
        <li>Our legal obligations to maintain account security</li>
      </ul>

      <h2>4. Data Sharing and Storage</h2>
      <p>
        We do not sell or share your personal data with third parties. Your data
        is stored securely and only accessible to authorized members of the
        CineNiche team. External services like YouTube may process your requests
        (e.g., trailer lookups), but your personal data is not shared.
      </p>

      <h2>5. Cookies and Tracking</h2>
      <p>
        We use cookies to manage sessions and remember your preferences. You can
        accept or reject cookie usage. No tracking cookies are used without
        consent.
      </p>

      <h2>6. Your Rights Under GDPR</h2>
      <ul>
        <li>Access, correct, or delete your personal data</li>
        <li>Withdraw consent at any time</li>
        <li>File a complaint with a supervisory authority</li>
      </ul>

      <h2>7. Data Retention</h2>
      <p>
        We retain your data while your account is active. If you delete your
        account or request removal, we delete your data within 30 days.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        For questions or data requests, contact us at:
        <br />
        <strong>Email:</strong> privacy@cineniche.com
      </p>

      <p>Thank you for trusting CineNiche.</p>
    </div>
  );
};

export default PrivacyPolicy;
