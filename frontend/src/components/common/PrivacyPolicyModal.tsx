import React from 'react';

interface Props {
  show: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<Props> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-md relative max-w-2xl max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h1 className="text-xl font-bold mb-2">Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> April 2025
        </p>
        <p>At CineNiche, your privacy is important to us...</p>
        {/* add your full privacy text here */}
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
