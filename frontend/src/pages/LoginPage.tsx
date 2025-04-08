import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    navigate('/register');
  };

  // TEMP login for testing
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
            className="btn w-100 mt-2"
            onClick={handleRegisterClick}
            style={styles.linkButton}
            type="button"
          >
            Register
          </button>

          <div className="d-grid mt-4">
            <button
              className="btn mb-2"
              type="button"
              style={styles.linkButton}
            >
              <i className="fa-brands fa-google me-2"></i>
              Sign in with Google
            </button>
            <button className="btn" type="button" style={styles.linkButton}>
              <i className="fa-brands fa-facebook-f me-2"></i>
              Sign in with Facebook
            </button>
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
