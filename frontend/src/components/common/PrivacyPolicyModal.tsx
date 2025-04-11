import React from 'react';

interface Props {
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '600px',
          position: 'relative',
          color: '#000',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        <h2>Privacy Policy</h2>
        <p>Effective Date: April 2025</p>
        <p>
          At <strong>CineNiche</strong>, your privacy is important to us...
        </p>
        {/* Add full privacy policy text here */}
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
