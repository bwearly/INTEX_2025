import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getCurrentUser } from '../../api/MoviesAPI';

const ProfileDropdown = () => {
  // UI states for hover/click behavior
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Track admin role (could be used for conditional rendering in future)
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  // Dropdown is visible if either hovered or clicked
  const isOpen = isHovered || isClicked;

  useEffect(() => {
    // Fetch user info to check if the current user is an admin
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setIsAdmin(data.role === 'admin');
      } catch (err) {
        console.error('Could not fetch user:', err);
      }
    };
    fetchUser();
  }, []);

  // Log out logic — navigates to login/home
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', zIndex: 1000 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Profile Icon (clickable) */}
      <FaUserCircle
        style={{ fontSize: '1.8rem', color: 'white', cursor: 'pointer' }}
        onClick={() => setIsClicked((prev) => !prev)}
      />

      {/* Dropdown Menu */}
      <div
        style={{
          position: 'absolute',
          top: '125%',
          right: 0,
          backgroundColor: '#111',
          border: '1px solid #444',
          borderRadius: '8px',
          padding: '0.5rem 0',
          minWidth: '150px',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        {/* Settings Option */}
        <div
          style={{
            padding: '8px 16px',
            color: '#ddd',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsClicked(false);
            navigate('/settings');
          }}
        >
          Settings
        </div>

        {/* Logout Option */}
        <div
          style={{
            padding: '8px 16px',
            color: '#6C9CB0', // retro blue
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#50798d')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#6C9CB0')}
          onClick={() => {
            setIsClicked(false);
            handleLogout();
          }}
        >
          Log Out
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
