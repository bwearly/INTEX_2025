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
  return (
    <div className="mb-8 px-4">
      <h2 className="text-xl font-bold text-white mb-3">{title}</h2>

      <div className="flex overflow-x-auto gap-4 pb-2 scroll-smooth snap-x">
        {movies.map((movie) => (
          <div key={movie.showId} className="snap-start">
            <MovieCard movie={movie} onClick={onClick} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
