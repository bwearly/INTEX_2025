import React from 'react';
import { Movie } from '../../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={() => onClick?.(movie)}>
      <img
        src={movie.posterUrl}
        onError={(e) => ((e.target as HTMLImageElement).src = '/images.png')}
      />
    </div>
  );
};

export default MovieCard;
