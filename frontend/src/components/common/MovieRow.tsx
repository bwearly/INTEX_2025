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
    <div className="mb-5 px-4">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="d-flex overflow-auto gap-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.showId}
            movie={movie}
            onClick={onClick}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
