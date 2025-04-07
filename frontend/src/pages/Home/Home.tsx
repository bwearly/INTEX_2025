import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await fetchMovies(200, 1, []);
      setMovies(response.movies);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />

      <div className="container-fluid px-4">
        {loading ? (
          <p className="text-center mt-4">Loading movies...</p>
        ) : (
          <HeroCarousel movies={movies} />
        )}
      </div>

      <div className="container mt-5">
        <h2>All Movie Titles</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.showId}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
