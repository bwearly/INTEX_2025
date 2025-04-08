import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';
const Home: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await fetchMovies(200, 1, []);
      setAllMovies(response.movies);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMovies();
  }, []);
  return (
    <div
      className="bg-dark text-white min-vh-100"
      style={{ paddingTop: '80px' }}
    >
      <Navbar />
      <HeroCarousel movies={allMovies} />
      <div className="container mt-5">
        <h2 className="text-white mb-3">All Movie Titles</h2>
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <ul>
            {allMovies.map((movie) => (
              <li key={movie.showId}>{movie.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Home;
