import React from 'react';
import { Movie } from '../../types/Movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="text-center text-white" style={{ width: '150px' }}>
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
