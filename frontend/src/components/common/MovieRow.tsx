import React from 'react';
import { Movie } from '../../types/Movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onClick?: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onClick }) => {
  return (
    <div className="mb-5 px-4">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="d-flex overflow-auto gap-3">
        {movies.map((movie) => (
          <div key={movie.showId} onClick={() => onClick?.(movie)}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
