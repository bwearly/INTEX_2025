import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/MoviesAPI';

const SettingsPage = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Tracks if the current user has admin privileges
  const navigate = useNavigate(); // React Router navigation function

  // On mount, check the current user's role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser(); // Fetch current user info from API
        setIsAdmin(data.role === 'admin'); // Set admin state if applicable
      } catch (err) {
        console.error('Could not fetch user:', err); // Log fetch errors
      }
    };

    fetchUser();
  }, []);

  // Base card styling for each settings option
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#111',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '1rem',
    color: '#eee',
    cursor: 'pointer',
    border: '1px solid #333',
    transition: 'background 0.2s ease-in-out',
  };

  // Hover state styling (used dynamically with Object.assign)
  const cardHoverStyle: React.CSSProperties = {
    backgroundColor: '#222',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        paddingTop: '80px', // Leave room for fixed navbar
        paddingLeft: '1rem',
        paddingRight: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ maxWidth: '500px', width: '100%' }}>
        {/* Settings Header */}
        <h2
          style={{ color: '#fff', marginBottom: '2rem', textAlign: 'center' }}
        >
          Settings
        </h2>

        {/* Privacy Policy Link Card */}
        <div
          style={cardStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, cardHoverStyle)
          }
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          onClick={() => navigate('/privacy')}
        >
          Privacy Policy
        </div>

        {/* Admin Panel Link Card (only shown to admins) */}
        {isAdmin && (
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardStyle)
            }
            onClick={() => navigate('/admin/movies')}
          >
            Admin Panel
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
