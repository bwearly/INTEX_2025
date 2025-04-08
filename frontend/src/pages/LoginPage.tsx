import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // handle change events for input fields
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
    navigate('admin');
  };

  // handle submit event for the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

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
        credentials: 'include', // ✅ Ensures cookies are sent & received
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Ensure we only parse JSON if there is content
      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/home');
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
              type="email"
              placeholder="Email"
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

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
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

            </form>
            {error && <p className="error">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
