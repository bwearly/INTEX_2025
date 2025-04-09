import { useEffect, useState } from 'react';
import { fetchGenres, fetchMovies } from '../api/MoviesAPI';
import GenreFilter from '../components/common/GenreFilter';
import MoviesList from '../components/common/MoviesList';
import { Movie } from '../types/Movie';

const MoviesPage = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Load genres from backend
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await fetchGenres();
        setGenres(genreList);
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };
    loadGenres();
  }, []);

  // Load all movies
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await fetchMovies(200, 1, []);
        setAllMovies(res.movies);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  return (
    <div className="text-white" style={{ paddingTop: '100px' }}>
      <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
        <h1 className="display-5 fw-bold mb-4">Movies</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Genre Filter Column */}
          <div className="w-full lg:w-1/4">
            <GenreFilter
              allMovies={allMovies}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </div>
          {/* Movie List Column */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <p>Loading movies...</p>
            ) : (
              <MoviesList
                allMovies={allMovies}
                selectedGenres={selectedGenres}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
