import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div
      className="privacy-policy"
      style={{
        padding: '2rem',
        paddingTop: '80px',
        color: '#fff',
        backgroundColor: '#000',
        minHeight: '100vh',
      }}
    >
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
          history) to improve recommendations
        </li>
        <li>Session data and cookies used to manage secure login sessions</li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <p>We use your data for the following purposes:</p>
      <ul>
        <li>
          To personalize your experience and provide relevant movie
          recommendations
        </li>
        <li>To manage your user account and allow login functionality</li>
        <li>To monitor site usage and improve our services</li>
      </ul>

      <h2>3. Legal Basis for Processing</h2>
      <p>We process your data based on:</p>
      <ul>
        <li>Your consent, given when you sign up and accept cookies</li>
        <li>Our legitimate interest in improving user experience</li>
        <li>Our legal obligations to maintain account security</li>
      </ul>

      <h2>4. Data Sharing and Storage</h2>
      <p>
        We do not sell or share your personal data with third parties. Your
        data is stored securely and only accessible to authorized members of
        the CineNiche team. Some external services, such as YouTube’s API, may
        process your requests (e.g., trailer lookups), but we do not send your
        personal data to them.
      </p>

      <h2>5. Cookies and Tracking</h2>
      <p>
        We use cookies to manage sessions and remember your preferences. Upon
        visiting the site, you are given the option to accept or reject cookie
        usage. No tracking or analytics cookies are used without your consent.
      </p>

      <h2>6. Your Rights Under GDPR</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request corrections to inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Withdraw consent at any time</li>
        <li>Lodge a complaint with a supervisory authority</li>
      </ul>

      <h2>7. Data Retention</h2>
      <p>
        We retain your data as long as your account is active. If you delete
        your account or request data removal, your data will be deleted within
        30 days.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions or wish to exercise your rights under GDPR,
        please contact us at:
        <br />
        <strong>Email:</strong> privacy@cineniche.com
      </p>

      <p>Thank you for trusting CineNiche.</p>
    </div>
  );
};

export default PrivacyPolicy;
