// src/components/common/MovieRow.tsx
import React from 'react';
import { Movie } from '../../types/Movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  onClick,
  onDelete,
}) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-8 w-full">
      <h2 className="text-2xl font-semibold text-white mb-3 px-4">{title}</h2>

      <div className="overflow-x-auto scrollbar-hide w-screen -ml-4 px-4">
        <div className="flex flex-nowrap gap-4 pb-2 scroll-smooth snap-x snap-mandatory">
          {movies.map((movie) => (
            <div key={movie.showId} className="snap-start">
              <MovieCard movie={movie} onClick={onClick} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
