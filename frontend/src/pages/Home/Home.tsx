import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import HeroCarousel from '../../components/common/HeroCarousel';
import MovieRow from '../../components/common/MovieRow';
import Navbar from '../../components/common/Navbar';
import React, { useEffect, useState } from 'react';

const genres = [
  'Action',
  'Adventure',
  'Comedies',
  'Dramas',
  'Thrillers',
  'FamilyMovies',
  'HorrorMovies',
];

const Home: React.FC = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>({});
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await fetchMovies(200, 1, []);
      const genreMap: Record<string, Movie[]> = {};

      genres.forEach((genre) => {
        genreMap[genre] = response.movies.filter((movie) => movie[genre as keyof Movie] === 1);
      });

      setMoviesByGenre(genreMap);
    } catch (err) {
      console.error('Failed to fetch and sort movies:', err);
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
        <p className="text-center mt-5">Loading movies...</p>
      ) : (
        genres.map((genre) => (
          <MovieRow key={genre} title={genre} movies={moviesByGenre[genre] || []} />
        ))
      )}
    </div>
  );
};

export default Home;

