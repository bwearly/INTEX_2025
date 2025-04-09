// src/components/common/MovieCard.tsx
import React from 'react';
import { Movie } from '../../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void; // ✅ Allow optional onClick
  onDelete?: (id: string) => void; // ✅ Allow optional onDelete
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, onDelete }) => {
  return (
    <div
      className="text-center text-white cursor-pointer transition-transform duration-200 hover:scale-105"
      style={{
        width: '150px',
        flex: '0 0 auto',
      }}
      onClick={() => onClick?.(movie)} // ✅ Trigger click if provided
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

      {/* Optional Edit/Delete Buttons (Admin use maybe?) */}
      {onDelete && (
        <div className="flex justify-center gap-2 mt-2 z-10 relative">
          <button
            className="bg-yellow-600 px-2 py-1 text-sm rounded hover:bg-yellow-700"
            onClick={(e) => {
              e.stopPropagation(); // prevent card onClick
              onClick?.(movie);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-600 px-2 py-1 text-sm rounded hover:bg-red-700"
            onClick={(e) => {
              e.stopPropagation(); // prevent card onClick
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
