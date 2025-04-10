import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/logo1.png'; // Make sure this exists in /public or /src

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') setRememberme(checked);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = rememberme
      ? 'https://localhost:5000/login?useCookies=true&useSessionCookies=false'
      : 'https://localhost:5000/login?useSessionCookies=true&useCookies=false';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Invalid email or password.');

      //my edits
      localStorage.setItem('email', email);
      navigate('/home');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <style>
        {`
          input::placeholder {
            color: #3D405B !important;
            opacity: 1 !important;
          }
        `}
      </style>
      <div className="login-page">
  <div
    style={{
      backgroundImage: `url('/background.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '1rem',
    }}
  >
    {/* logo, title, and login box go here */}
  </div>
</div>

        {/* LOGO + TITLE */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '1rem',
          }}
        >
          <img
            src={logo}
            alt="CineNiche Logo"
            style={{
              height: '36px',
              width: '36px',
              objectFit: 'contain',
            }}
          />
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              letterSpacing: '1px',
              color: '#6C9CB0',
            }}
          >
            CINENICHE
          </span>
        </div>

        {/* LOGIN CARD */}
        <div
          style={{
            backgroundColor: 'rgba(245, 230, 211, 0.9)',
            padding: '3rem',
            borderRadius: '10px',
            width: '100%',
            maxWidth: '350px',
            color: '#3D405B',
          }}
        >
          <h3 className="mb-4 text-center">Sign In</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                style={{
                  backgroundColor: '#F5E6D3',
                  color: '#3D405B',
                  border: '1px solid #6C9CB0',
                  fontSize: '0.9rem',
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                style={{
                  backgroundColor: '#F5E6D3',
                  color: '#3D405B',
                  border: '1px solid #6C9CB0',
                  fontSize: '0.9rem',
                }}
              />
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberme"
                name="rememberme"
                checked={rememberme}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberme">
                Remember password
              </label>
            </div>
            <div className="d-grid mb-2">
              <button
                className="btn btn-primary"
                type="submit"
                style={{
                  backgroundColor: '#6C9CB0',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: '#F5E6D3',
                }}
              >
                Sign in
              </button>
            </div>
            <div className="d-grid mb-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/register')}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #6C9CB0',
                  color: '#6C9CB0',
                  fontSize: '0.9rem',
                }}
              >
                Register
              </button>
            </div>
            {error && (
              <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '1rem' }}>
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
