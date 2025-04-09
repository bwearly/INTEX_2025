// src/components/common/MovieCard.tsx
import React from 'react';
import { Movie } from '../../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, onDelete }) => {
  const encodedPoster = encodeURIComponent(movie.posterUrl || 'default.jpg');

  return (
    <div
      className="text-center text-white cursor-pointer"
      style={{ width: '150px', flex: '0 0 auto' }}
      onClick={() => onClick?.(movie)}
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        style={{
          width: '100%',
          height: '220px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
        onError={(e) => ((e.target as HTMLImageElement).src = '/images.png')}
      />
      <p className="mt-2 font-semibold text-white text-sm">{movie.title}</p>
      <p className="text-xs text-gray-400 -mt-1">{movie.releaseYear}</p>

      {onDelete && (
        <div className="flex justify-center gap-2 mt-2 z-10 relative">
          <button
            className="bg-yellow-600 px-2 py-1 text-sm rounded hover:bg-yellow-700"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(movie);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-600 px-2 py-1 text-sm rounded hover:bg-red-700"
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
