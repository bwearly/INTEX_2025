import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      fetch('https://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then((data) => {
          if (data.ok) setError('Successful registration. Please log in.');
          else setError('Error registering.');
        })
        .catch((error) => {
          console.error(error);
          setError('Error registering.');
        });
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
          <h3 className="mb-4 text-center">Register</h3>
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
            <div style={{ marginBottom: '1rem' }}>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
                style={{
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  fontSize: '0.9rem',
                }}
              />
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
                Register
              </button>
            </div>
            <div className="d-grid mb-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/login')}
                style={{
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  color: 'white',
                  fontSize: '0.9rem',
                }}
              >
                Go to Login
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

export default Register;
