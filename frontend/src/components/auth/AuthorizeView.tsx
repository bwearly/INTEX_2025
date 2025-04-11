import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

const UserContext = createContext<User | null>(null);

interface User {
  email: string;
}

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Tracks loading state

  let emptyuser: User = { email: '' };
  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);

        const contentType = response.headers.get('content-type');

        // Validate response is JSON before parsing
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format from server');
        }

        const data = await response.json();

        // Check if a valid user session exists
        if (data.email) {
          setUser({ email: data.email });
          setAuthorized(true);
        } else {
          throw new Error('Invalid user session');
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry(
      'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/pingauth',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display while checking auth
  }

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/" />; // Redirect if not authorized
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null; // Avoids rendering errors when user is null

  return props.value === 'email' ? <>{user.email}</> : null;
}

export default AuthorizeView;
