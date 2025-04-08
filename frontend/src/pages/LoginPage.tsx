import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Identity.css'; // ← Uncomment if you actually create this file
//import '@fortawesome/fontawesome-free/css/all.css';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleRegisterClick = () => {
    navigate('/registerPage');
  };

<<<<<<< HEAD
=======
  // ✅ TEMPORARY: Hardcoded login for testing
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (email === '1' && password === '2') {
      navigate('/home');
    } else {
      setError('Invalid login. Use email: 1 and password: 2');
    }
  };

  /* 
  // 🔒 ORIGINAL: Backend login with fetch
>>>>>>> parent of e049087 (added a ton of security and cookies)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = rememberme
      ? 'https://localhost:5000/login?useCookies=true'
      : 'https://localhost:5000/login?useSessionCookies=true';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/competition');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };
  */

<<<<<<< HEAD
  const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
      backgroundImage: `url('/login-bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      padding: '3rem',
      borderRadius: '8px',
      width: '100%',
      maxWidth: '350px',
      color: 'white',
    },
    input: {
      backgroundColor: '#333',
      color: 'white',
      border: 'none',
      fontSize: '0.9rem',
    },
    button: {
      backgroundColor: '#e50914',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '1rem',
      marginTop: '1rem',
    },
    linkButton: {
      backgroundColor: '#333',
      border: '1px solid #555',
      color: 'white',
      fontSize: '0.9rem',
      marginTop: '0.5rem',
    },
    error: {
      color: 'red',
      fontSize: '0.85rem',
      marginTop: '1rem',
    },
    smallText: {
      color: '#aaa',
      fontSize: '0.8rem',
      marginTop: '1rem',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    socialLink: {
      textAlign: 'center',
      color: '#aaa',
      fontSize: '0.85rem',
      marginTop: '0.75rem',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <h3 className="mb-4">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <input
              className="form-control"
              style={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
=======
  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="string"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
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
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </div>

              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button
                  className="btn btn-google btn-login text-uppercase fw-bold"
                  type="button"
                >
                  <i className="fa-brands fa-google me-2"></i> Sign in with
                  Google
                </button>
              </div>
              <div className="d-grid mb-2">
                <button
                  className="btn btn-facebook btn-login text-uppercase fw-bold"
                  type="button"
                >
                  <i className="fa-brands fa-facebook-f me-2"></i> Sign in with
                  Facebook
                </button>
              </div>
            </form>
            {error && <p className="error text-danger mt-3">{error}</p>}
>>>>>>> parent of e049087 (added a ton of security and cookies)
          </div>
          <div style={styles.inputGroup}>
            <input
              className="form-control"
              style={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
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
              className="btn btn-primary btn-login text-uppercase fw-bold"
              type="submit"
            >
              Sign in
            </button>
          </div>

          <div className="d-grid mb-2">
            <button
              type="button"
              className="btn btn-primary btn-login text-uppercase fw-bold"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>

          <hr className="my-4" />
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
