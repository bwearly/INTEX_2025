// src/components/common/Recommended.tsx
import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import MovieRow from './MovieRow';

interface RecommendedProps {
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const Recommended: React.FC<RecommendedProps> = ({ onClick, onDelete }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        const response = await fetch(
          `https://localhost:5000/api/YourControllerName/GetUserRecommendations?email=${encodeURIComponent(email)}`,
          {
            credentials: 'include',
          }
        );

        if (!response.ok) throw new Error('Failed to fetch recommended movies');

        const data = await response.json();
        setRecommendedMovies(data);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <MovieRow
      title="Recommended for You"
      movies={recommendedMovies}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
};

export default Recommended;
