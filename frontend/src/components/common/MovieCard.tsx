import React from 'react';
import { Movie } from '../../types/Movie';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(movie); // Custom click handler if provided
    } else {
      navigate(`/movie/${movie.showId}`); // Default behavior: navigate to details
    }
  };

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        onError={(e) => {
          // Fallback image if poster fails to load
          (e.target as HTMLImageElement).src = '/poster1.png';
        }}
      />
    </div>
  );
};

export default MovieCard;
