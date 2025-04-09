import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/MoviesAPI'; // adjust path if needed

const SettingsPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log('Fetched user from /me:', data); // ✅ This should show in your browser console
        setIsAdmin(data.role === 'admin');
      } catch (err) {
        console.error('Could not fetch user:', err);
      }
    };

    fetchUser();
  }, []);

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

  const cardHoverStyle: React.CSSProperties = {
    backgroundColor: '#222',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        paddingTop: '80px',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <h2
          style={{ color: '#fff', marginBottom: '2rem', textAlign: 'center' }}
        >
          Settings
        </h2>

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
