import React from 'react';
import { Movie } from '../../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, onDelete }) => {
  return (
    <div className="movie-card" onClick={() => onClick?.(movie)}>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        onError={(e) => ((e.target as HTMLImageElement).src = '/images.png')}
      />

      {onDelete && (
        <div className="admin-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(movie);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(movie.showId);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
