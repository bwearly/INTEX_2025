import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster: string;
}

interface Props {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<Props> = ({ title, movies }) => {
  return (
    <div className="mb-5">
      <h4 className="text-white mb-3">{title}</h4>
      <div className="d-flex overflow-auto gap-3 px-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} title={movie.title} poster={movie.poster} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
