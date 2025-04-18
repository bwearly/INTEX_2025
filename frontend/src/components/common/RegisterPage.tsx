import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/logo1.png';

function Register() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes and update corresponding state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // Handle form submission and perform basic client-side validation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');

      // Attempt registration API call
      fetch(
        'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      )
        .then((data) => {
          if (data.ok) {
            setError('Successful registration. Please log in.');
          } else {
            setError('Error registering.');
          }
        })
        .catch((error) => {
          console.error(error);
          setError('Error registering.');
        });
    }
  };

  return (
    <>
      {/* Custom placeholder color override */}
      <style>
        {`
          input::placeholder {
            color: #3D405B !important;
            opacity: 1 !important;
          }
        `}
      </style>

      {/* Full page background and centered content */}
      <div
        className="register-page"
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
        {/* Logo + Title */}
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
            style={{ height: '36px', width: '36px', objectFit: 'contain' }}
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

        {/* Registration Form Card */}
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
          <h3 className="mb-4 text-center">Register</h3>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Confirm Password Input */}
            <div style={{ marginBottom: '1rem' }}>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                style={{
                  backgroundColor: '#F5E6D3',
                  color: '#3D405B',
                  border: '1px solid #6C9CB0',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            {/* Submit Button */}
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
                Register
              </button>
            </div>

            {/* Navigation to Login */}
            <div className="d-grid mb-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #6C9CB0',
                  color: '#6C9CB0',
                  fontSize: '0.9rem',
                }}
              >
                Go to Login
              </button>
            </div>

            {/* Display any validation or error messages */}
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

export default Register;
