import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Recommended from '../components/common/Recommended';

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
      //<Recommended {email}/>
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
      color: white !important;
      opacity: 1 !important;
        `}
      </style>
      <div
        style={{
          backgroundImage: `url('/login-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: '3rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '350px',
            color: 'white',
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
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
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
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
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
                  backgroundColor: '#e50914',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
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
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  color: 'white',
                  fontSize: '0.9rem',
                }}
              >
                Register
              </button>
            </div>
            {error && (
              <p
                style={{ color: 'red', fontSize: '0.85rem', marginTop: '1rem' }}
              >
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
