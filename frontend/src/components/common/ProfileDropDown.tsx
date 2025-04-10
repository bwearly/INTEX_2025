import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { getCurrentUser } from '../../api/MoviesAPI'; // path may vary

const ProfileDropdown = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const isOpen = isHovered || isClicked;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log('User fetched:', data);
        setIsAdmin(data.role === 'admin');
      } catch (err) {
        console.error('Could not fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', zIndex: 1000 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FaUserCircle
        style={{ fontSize: '1.8rem', color: 'white', cursor: 'pointer' }}
        onClick={() => setIsClicked((prev) => !prev)}
      />

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
