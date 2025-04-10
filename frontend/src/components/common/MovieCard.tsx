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
      onClick(movie);
    } else {
      navigate(`/movie/${movie.showId}`);
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
        onError={(e) => ((e.target as HTMLImageElement).src = '/images.png')}
      />
    </div>
  );
};

export default MovieCard;
