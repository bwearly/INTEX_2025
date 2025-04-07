import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  posterUrl: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  return (
    <div className="mb-5 px-4">
      <h4 className="mb-3 text-white">{title}</h4>
      <div className="d-flex movie-row">
        {movies.map((movie) => (
          <MovieCard key={movie.id} title={movie.title} posterUrl={movie.posterUrl} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
