// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [rememberme, setRememberme] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, checked, value } = e.target;
//     if (type === 'checkbox') {
//       setRememberme(checked);
//     } else if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   const handleRegisterClick = () => {
//     navigate('/registerPage');
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     const loginUrl = rememberme
//       ? 'https://localhost:5000/login?useCookies=true'
//       : 'https://localhost:5000/login?useSessionCookies=true';

//     try {
//       const response = await fetch(loginUrl, {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       let data = null;
//       const contentLength = response.headers.get('content-length');
//       if (contentLength && parseInt(contentLength, 10) > 0) {
//         data = await response.json();
//       }

//       if (!response.ok) {
//         throw new Error(data?.message || 'Invalid email or password.');
//       }

//       navigate('/competition');
//     } catch (error: any) {
//       setError(error.message || 'Error logging in.');
//       console.error('Fetch attempt failed:', error);
//     }
//   };

//   const styles: { [key: string]: React.CSSProperties } = {
//     wrapper: {
//       backgroundImage: `url('/login-bg.png')`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//       minHeight: '100vh',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     overlay: {
//       backgroundColor: 'rgba(0, 0, 0, 0.75)',
//       padding: '3rem',
//       borderRadius: '8px',
//       width: '100%',
//       maxWidth: '350px',
//       color: 'white',
//     },
//     input: {
//       backgroundColor: '#333',
//       color: 'white',
//       border: 'none',
//       fontSize: '0.9rem',
//     },
//     button: {
//       backgroundColor: '#e50914',
//       border: 'none',
//       fontWeight: 'bold',
//       fontSize: '1rem',
//       marginTop: '1rem',
//     },
//     linkButton: {
//       backgroundColor: '#333',
//       border: '1px solid #555',
//       color: 'white',
//       fontSize: '0.9rem',
//       marginTop: '0.5rem',
//     },
//     error: {
//       color: 'red',
//       fontSize: '0.85rem',
//       marginTop: '1rem',
//     },
//     smallText: {
//       color: '#aaa',
//       fontSize: '0.8rem',
//       marginTop: '1rem',
//     },
//     inputGroup: {
//       marginBottom: '1rem',
//     },
//     socialLink: {
//       textAlign: 'center',
//       color: '#aaa',
//       fontSize: '0.85rem',
//       marginTop: '0.75rem',
//       cursor: 'pointer',
//     },
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.overlay}>
//         <h3 className="mb-4">Sign In</h3>
//         <form onSubmit={handleSubmit}>
//           <div style={styles.inputGroup}>
//             <input
//               className="form-control"
//               style={styles.input}
//               type="email"
//               placeholder="Email"
//               name="email"
//               value={email}
//               onChange={handleChange}
//             />
//           </div>
//           <div style={styles.inputGroup}>
//             <input
//               className="form-control"
//               style={styles.input}
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={password}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-check mb-3">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="rememberme"
//               name="rememberme"
//               checked={rememberme}
//               onChange={handleChange}
//             />
//             <label className="form-check-label" htmlFor="rememberme">
//               Remember password
//             </label>
//           </div>

//           <div className="d-grid mb-2">
//             <button
//               className="btn btn-primary btn-login text-uppercase fw-bold"
//               type="submit"
//             >
//               Sign in
//             </button>
//           </div>

//           <div className="d-grid mb-2">
//             <button
//               type="button"
//               className="btn btn-primary btn-login text-uppercase fw-bold"
//               onClick={handleRegisterClick}
//             >
//               Register
//             </button>
//           </div>

//           <hr className="my-4" />
//           {error && <p style={styles.error}>{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // state variables for email and passwords
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);

  // state variable for error messages
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
    navigate('/register');
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

  return (
    <div className="container">
      <div className="row">
        <div className="card border-0 shadow rounded-3 ">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
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
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
