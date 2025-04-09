import { useEffect, useRef, useState } from 'react';
import { fetchGenres, fetchMovies } from '../api/MoviesAPI';
import GenreFilter from '../components/common/GenreFilter';
import { Movie } from '../types/Movie';
import MovieCard from '../components/common/MovieCard';

const MoviesPage = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
      }
    };
    loadMovies();
  }, []);

  // Scroll to genre section when selected
  const handleGenreSelect = (genre: string) => {
    const section = genreRefs.current[genre];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="text-white" style={{ paddingTop: '100px' }}>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center px-4 mb-4">
        <h1 className="display-5 fw-bold">Movies</h1>
        <select
          className="form-select w-auto bg-dark text-white"
          onChange={(e) => handleGenreSelect(e.target.value)}
          defaultValue=""
        >
          <option disabled value="">
            Select Genre
          </option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Genre Filter Dropdown */}
      <div className="px-4 mb-4">
        <GenreFilter
          allMovies={allMovies}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      </div>

      {/* Movie Rows by Genre */}
      {selectedGenres.map((genre) => (
        <div
          key={genre}
          ref={(el) => (genreRefs.current[genre] = el)}
          className="mb-5 px-4"
        >
          <h3 className="mb-3">{genre}</h3>
          <div className="d-flex flex-wrap gap-4">
            {allMovies
              .filter((movie) => ((movie as any)[genre.toLowerCase()] ?? 0) > 0)
              .map((movie) => (
                <MovieCard key={movie.showId} movie={movie} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;
