import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/MoviesAPI';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container mt-5 text-white">
      <h2 className="mb-4">Account Information</h2>
      {user ? (
        <ul className="list-group">
          <li className="list-group-item bg-dark text-light">Name: {user.name}</li>
          <li className="list-group-item bg-dark text-light">Email: {user.email}</li>
          <li className="list-group-item bg-dark text-light">Age: {user.age}</li>
          <li className="list-group-item bg-dark text-light">Gender: {user.gender}</li>
          <li className="list-group-item bg-dark text-light">Admin: {user.role === 'admin' ? 'Yes' : 'No'}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
