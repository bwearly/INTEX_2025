import { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
}

const MovieRow = ({ title }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetchMovies(10, 1, [title]);
        setMovies(response.movies);
      } catch (error) {
        console.error(`Failed to load ${title} movies:`, error);
      }
    };

    loadMovies();
  }, [title]);

  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {movies.map((movie) => (
          <MovieCard key={movie.ShowId} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
