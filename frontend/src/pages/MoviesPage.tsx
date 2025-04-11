import { useEffect, useRef, useState } from 'react';
import { fetchMovies } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import MovieCard from '../components/common/MovieCard';
import '../components/common/HorizontalScroll.css';

const MoviesPage = () => {
  // --- State for filtered movie list, genres, and loading status ---
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [movieOnlyList, setMovieOnlyList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // --- References for genre sections used in "Jump to Genre" navigation ---
  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // --- Format genre key into readable string for display ---
  const formatGenre = (genre: string) =>
    genre.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  // --- Smooth scroll to the selected genre row ---
  const handleGenreJump = (genre: string) => {
    const section = genreRefs.current[genre];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- Fetch movies on initial page load ---
  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Fetch up to 200 movies from the API
        const res = await fetchMovies(200, 1, []);

        // Filter to only include movies (not TV Shows)
        const filteredMovies = res.movies.filter((m) => m.type === 'Movie');
        setMovieOnlyList(filteredMovies);

        // Extract genre keys (properties with value 1) from each movie
        const genreSet = new Set<string>();
        filteredMovies.forEach((movie) => {
          Object.keys(movie).forEach((key) => {
            if (
              (movie as any)[key] === 1 &&
              typeof (movie as any)[key] === 'number'
            ) {
              genreSet.add(key);
            }
          });
        });

        // Sort genre list alphabetically for dropdown
        const sorted = Array.from(genreSet).sort((a, b) =>
          formatGenre(a).localeCompare(formatGenre(b))
        );
        setSelectedGenres(sorted);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // --- Horizontal scrolling logic for left/right arrow buttons ---
  const scrollRow = (genre: string, direction: 'left' | 'right') => {
    const section = document.getElementById(`scroll-${genre}`);
    if (section) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      section.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // --- Main Page Layout ---
  return (
    <div className="text-white" style={{ paddingTop: '100px' }}>
      <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
        {/* --- Header and Genre Jump Dropdown --- */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-5 fw-bold">Movies</h1>
          <select
            className="form-select w-auto bg-dark text-white"
            onChange={(e) => handleGenreJump(e.target.value)}
            defaultValue=""
          >
            <option disabled value="">
              Jump to Genre
            </option>
            {selectedGenres.map((g) => (
              <option key={g} value={g}>
                {formatGenre(g)}
              </option>
            ))}
          </select>
        </div>

        {/* --- Genre Rows --- */}
        {selectedGenres.map((genre) => {
          // Filter movies by current genre key (value === 1)
          const moviesForGenre = movieOnlyList.filter(
            (movie) => (movie as any)[genre] === 1
          );
          if (moviesForGenre.length === 0) return null;

          return (
            <div
              key={genre}
              ref={(el: HTMLDivElement | null) => {
                genreRefs.current[genre] = el;
              }}
              className="movie-row-container mb-5"
              style={{ scrollMarginTop: '120px' }}
            >
              <h3 className="mb-3">{formatGenre(genre)}</h3>

              {/* --- Scrollable Row with Arrow Buttons --- */}
              <div className="group">
                <button
                  className="scroll-btn scroll-btn-left"
                  onClick={() => scrollRow(genre, 'left')}
                >
                  ‹
                </button>

                <div
                  id={`scroll-${genre}`}
                  className="horizontal-scroll-container"
                >
                  {moviesForGenre.map((movie) => (
                    <div key={movie.showId} className="movie-card">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>

                <button
                  className="scroll-btn scroll-btn-right"
                  onClick={() => scrollRow(genre, 'right')}
                >
                  ›
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesPage;
