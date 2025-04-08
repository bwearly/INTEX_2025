import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '/logo.png';
import Logout from './Logout';
import AuthorizeView from '../auth/AuthorizeView';
import ProfileDropdown from './ProfileDropDown';
=======
import logo from '../../../public/logo.png';
>>>>>>> parent of e049087 (added a ton of security and cookies)

const CustomNavbar = ({ minimal = false }: { minimal?: boolean }) => {
  const navigate = useNavigate();

  const navItemStyle: React.CSSProperties = {
    color: '#bbb',
    cursor: 'pointer',
    marginRight: '16px',
    fontWeight: 400,
    fontSize: '0.9rem',
    transition: 'color 0.2s ease-in-out',
  };

  return (
    <BootstrapNavbar
      expand="lg"
      fixed="top"
      className="px-4 py-2"
      style={{
        backgroundColor: '#000',
        borderBottom: '2px solid #111',
        zIndex: 1000,
      }}
    >
      <Container fluid className="d-flex align-items-center">
        {/* Logo & Brand */}
        <BootstrapNavbar.Brand
          onClick={() => navigate('/')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <img
            src={logo}
            alt="CineNiche Logo"
            style={{ height: '32px', width: '32px', objectFit: 'contain' }}
          />
          <span
            style={{
              color: '#e50914',
              fontWeight: 'bold',
              fontSize: '20px',
              letterSpacing: '1px',
            }}
          >
            CINENICHE
          </span>
        </BootstrapNavbar.Brand>

        {/* Nav Links */}
        {!minimal && (
          <div className="d-flex align-items-center ms-4 gap-4">
            <span
              style={navItemStyle}
              onClick={() => navigate('/mylist')}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#bbb')}
            >
              My List
            </span>
            <span
              style={navItemStyle}
              onClick={() => navigate('/tv')}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#bbb')}
            >
              TV Shows
            </span>
            <span
              style={navItemStyle}
              onClick={() => navigate('/movies')}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#bbb')}
            >
              Movies
            </span>
            <span
              style={navItemStyle}
              onClick={() => navigate('/categories')}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#bbb')}
            >
              Categories
            </span>
          </div>
        )}
<<<<<<< HEAD

        {/* Icons */}
        {!minimal && (
          <div className="d-flex align-items-center gap-3 ms-auto">
            <FaSearch style={{ color: 'white', cursor: 'pointer' }} />
            <ProfileDropdown isAdmin={true} />
          </div>
        )}

        {/* Logout / Auth View */}
        <span>
          <AuthorizeView>
            <Logout>Logout</Logout>
          </AuthorizeView>
        </span>
      </Container>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
=======
      </div>
    </nav>
  );
};

export default Navbar;
>>>>>>> parent of e049087 (added a ton of security and cookies)
