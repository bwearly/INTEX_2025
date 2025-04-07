import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import HeroCarousel from '../../components/common/HeroCarousel';
import MovieRow from '../../components/common/MovieRow';
import Navbar from '../../components/common/Navbar';

const genres = ['Action', 'Adventure', 'Comedy', 'Dramas', 'Thrillers', 'Family'];

const Home: React.FC = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>({});
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const response = await fetchMovies(200, 1, []);
      const genreMap: Record<string, Movie[]> = {};

      genres.forEach((genre) => {
        const genreKey = genre.replace(/\s/g, '');
        genreMap[genre] = response.movies.filter((movie) => movie[genreKey as keyof Movie] === 1);
      });

      setMoviesByGenre(genreMap);
    } catch (error) {
      console.error('Failed to load movies:', error);
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
      <HeroCarousel />
      {loading ? (
        <p className="text-center mt-4">Loading movies...</p>
      ) : (
        genres.map((genre) => (
          <MovieRow key={genre} title={genre} movies={moviesByGenre[genre] || []} />
        ))
      )}
    </div>
  );
};

export default Home;
