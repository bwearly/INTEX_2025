import React from 'react';
import { Movie } from '../../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, onDelete }) => {
  return (
    <div
      className="text-center text-white position-relative"
      style={{ width: '150px' }}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{ width: '100%', borderRadius: '8px' }}
        onClick={() => onClick?.(movie)}
      />
      <p className="mt-1 text-sm">{movie.title}</p>

      {onClick && onDelete && (
        <div className="d-flex justify-content-center gap-2 mt-2">
          <button
            className="btn btn-sm btn-outline-warning"
            onClick={() => onClick(movie)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(movie.showId)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
