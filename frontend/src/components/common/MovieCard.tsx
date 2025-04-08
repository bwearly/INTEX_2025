import React from 'react';
import { Movie } from '../../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      className="text-center text-white cursor-pointer"
      style={{ width: '150px' }}
      onClick={() => onClick?.(movie)}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <p className="mt-1 text-sm">{movie.title}</p>
    </div>
  );
};

export default MovieCard;
