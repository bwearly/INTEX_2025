import React, { useEffect, useState } from 'react';
import { fetchUserProfile, UserProfile } from '../api/MoviesAPI';

export default function AccountPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      } catch (err: any) {
        console.error('Failed to fetch user profile:', err);
        setError(err.message || 'Error fetching user profile');
      } finally {
        setLoading(false);
      }
    }
    loadUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-white">
        <h2 className="mb-4">Account Information</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-white">
        <h2 className="mb-4">Account Information</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-white">
      <h2 className="mb-4">Account Information</h2>
      {userProfile ? (
        <ul className="list-group">
          <li className="list-group-item bg-dark text-light">
            Name: {userProfile.name}
          </li>
          <li className="list-group-item bg-dark text-light">
            Email: {userProfile.email}
          </li>
          <li className="list-group-item bg-dark text-light">
            Age: {userProfile.age}
          </li>
          <li className="list-group-item bg-dark text-light">
            Gender: {userProfile.gender}
          </li>
          <li className="list-group-item bg-dark text-light">
            City: {userProfile.city}
          </li>
        </ul>
      ) : (
        <p>No user profile found.</p>
      )}
    </div>
  );
}
