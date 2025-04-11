import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import MovieRow from './MovieRow';

interface RecommendedProps {
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

// Maps each showId to an array of recommended movies
type RecommendationMap = {
  [showId: string]: Movie[];
};

const Recommended: React.FC<RecommendedProps> = ({ onClick, onDelete }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendationMap>(
    {}
  );

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) return;

        // Fetch personalized recommendations from the backend
        const response = await fetch(
          `https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/api/Recommendations/GetUserRecommendations?email=${encodeURIComponent(email)}`,
          {
            credentials: 'include',
          }
        );

        if (!response.ok) throw new Error('Failed to fetch recommended movies');

        const data: RecommendationMap = await response.json();

        setRecommendedMovies(data);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="space-y-8 p-4">
      {/* Render one MovieRow per show ID’s recommendation list */}
      {Object.entries(recommendedMovies).map(([showId, movies]) => (
        <MovieRow
          key={showId}
          title={`Based on show ID: ${showId}`}
          movies={movies}
          onClick={onClick}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Recommended;
