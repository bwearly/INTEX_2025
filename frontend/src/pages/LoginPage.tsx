import { useState } from 'react';

function LoginPage({ goTo }: { goTo: (page: 'login' | 'home' | 'admin') => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberme, setRememberme] = useState(false);
  const [error, setError] = useState('');

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
    goTo('admin');
  };

  // ✅ TEMPORARY: Hardcoded login for testing
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (email === '1' && password === '2') {
      goTo('home');
    } else {
      setError('Invalid login. Use email: 1 and password: 2');
    }
  };

  /*
  // 🔒 ORIGINAL: Backend login with fetch
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

      goTo('home');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };
  */

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
              type="text"
              placeholder="Email or phone number"
              name="email"
              value={email}
              onChange={handleChange}
            />
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

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberme"
              name="rememberme"
              checked={rememberme}
              onChange={handleChange}
            />
            <label className="form-check-label ms-1" htmlFor="rememberme">
              Remember me
            </label>
          </div>

          <button
            className="btn w-100 text-white"
            type="submit"
            style={styles.button}
          >
            Sign In
          </button>

          <button
            className="btn w-100"
            onClick={handleRegisterClick}
            style={styles.linkButton}
            type="button"
          >
            Register
          </button>

          <div style={styles.socialLink}>
            <i className="fa-brands fa-google me-2" />
            Sign in with Google
          </div>
          <div style={styles.socialLink}>
            <i className="fa-brands fa-facebook-f me-2" />
            Sign in with Facebook
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.smallText}>
            New to CineNiche? <span style={{ color: '#fff' }}>Sign up now.</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
