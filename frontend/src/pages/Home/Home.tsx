import React, {
  useEffect,
  useRef,
  useState,
  useCallback, // Import useCallback
} from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';
import MovieCard from '../../components/common/MovieCard';
import AuthorizeView from '../../components/auth/AuthorizeView';
// Make sure CSS path is correct and contains the .scroll-btn, .group etc styles
import '../../components/common/HorizontalScroll.css';
import {
  recommenderMapByColumn,
  fetchMoviesByIds,
} from '../../api/RecommenderAPI';

// Define interface for button visibility state per genre
interface ScrollButtonVisibility {
  showLeft: boolean;
  showRight: boolean;
}

const Home: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendationsByGenre, setRecommendationsByGenre] = useState<
    Record<string, Movie[]>
  >({});
  const [loading, setLoading] = useState(true);

  // Ref for jump-to functionality (keep as is)
  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Ref for scrollable containers for each genre
  const scrollContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // State to manage button visibility for each genre's row
  const [buttonVisibility, setButtonVisibility] = useState<
    Record<string, ScrollButtonVisibility>
  >({});

  // --- Data Fetching and Processing (Keep as is) ---
  const formatGenre = (genre: string) =>
    genre.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const normalizeGenreKey = (key: string) => {
    return key
      .replace(/Movies|TvShows?|Series/gi, '')
      .replace(/([A-Z])/g, (match) => match.toLowerCase())
      .replace(/[^a-z]/gi, '')
      .trim();
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true); // Ensure loading starts true
      try {
        const res = await fetchMovies(100, 1, []);
        setAllMovies(res.movies);

        const genreSet = new Set<string>();
        res.movies.forEach((movie) => {
          Object.keys(movie).forEach((key) => {
            if (
              (movie as any)[key] === 1 &&
              typeof (movie as any)[key] === 'number' &&
              !['releaseYear', 'showId'].includes(
                key
              ) /* Avoid non-genre numeric keys */
            ) {
              genreSet.add(key);
            }
          });
        });

        // Sort genres alphabetically before setting state
        const genres = Array.from(genreSet).sort((a, b) =>
          formatGenre(a).localeCompare(formatGenre(b))
        );
        setSelectedGenres(genres);

        // Initialize button visibility state for all potential genres
        const initialVisibility: Record<string, ScrollButtonVisibility> = {};
        genres.forEach((genre) => {
          initialVisibility[genre] = { showLeft: false, showRight: false }; // Start hidden, useEffect will calculate
        });
        setButtonVisibility(initialVisibility);

        // --- Recommendation fetching (Keep as is) ---
        const watchedRes = await fetch(
          'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/api/Recommendations/GetWatchedTitles',
          { credentials: 'include' }
        );
        const watchedIds: string[] = await watchedRes.json();
        const genreRecs: Record<string, Movie[]> = {};
        for (const rawGenre of genres) {
          const normalizedKey = normalizeGenreKey(rawGenre);
          if (!recommenderMapByColumn[normalizedKey]) {
            /*...*/ continue;
          }
          let found = false;
          for (const showId of watchedIds) {
            try {
              const ids = await recommenderMapByColumn[normalizedKey](showId);
              if (ids.length > 0) {
                const recMovies = await fetchMoviesByIds(ids);
                genreRecs[rawGenre] = recMovies;
                found = true;
                break;
              }
            } catch (err) {
              /*...*/
            }
          }
          if (!found) {
            /*...*/
          }
        }
        setRecommendationsByGenre(genreRecs);
        // --- End Recommendation fetching ---
      } catch (err) {
        console.error('Failed during initial data load:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []); // Empty dependency array is correct here for initial load

  // --- Scroll Button Logic ---
  const updateScrollButtons = useCallback((genre: string) => {
    const el = scrollContainerRefs.current[genre];
    if (el) {
      const tolerance = 1; // Pixel tolerance
      const canScrollLeft = el.scrollLeft > tolerance;
      const canScrollRight =
        Math.ceil(el.scrollLeft) + el.clientWidth < el.scrollWidth - tolerance;

      setButtonVisibility((prev) => {
        // Only update if visibility actually changed for this genre
        if (
          prev[genre]?.showLeft !== canScrollLeft ||
          prev[genre]?.showRight !== canScrollRight
        ) {
          // console.log(`Updating buttons for "${genre}": L=${canScrollLeft}, R=${canScrollRight}`); // Optional log
          return {
            ...prev,
            [genre]: { showLeft: canScrollLeft, showRight: canScrollRight },
          };
        }
        return prev; // No change needed
      });
    }
  }, []); // No dependencies needed as it uses refs and updates state based on genre arg

  // Effect to add/remove listeners for *each* row when genres/recommendations are ready
  useEffect(() => {
    const observers: Record<string, ResizeObserver> = {};
    const genresToObserve = selectedGenres; // Use all potential genres

    // Function to set up listeners for a specific genre's element
    const setupListeners = (genre: string) => {
      const el = scrollContainerRefs.current[genre];
      if (!el) return; // Skip if ref not attached yet

      // Initial calculation
      updateScrollButtons(genre);

      // Scroll listener
      const handleScroll = () => updateScrollButtons(genre);
      el.addEventListener('scroll', handleScroll, { passive: true });

      // Resize observer (more reliable than window resize for element changes)
      let observer: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(() => updateScrollButtons(genre));
        observer.observe(el);
        observers[genre] = observer; // Store observer for cleanup
      } else {
        // Fallback for older browsers
        window.addEventListener('resize', handleScroll);
      }

      // Return cleanup function for this specific genre
      return () => {
        el.removeEventListener('scroll', handleScroll);
        if (observer) {
          observer.disconnect();
        } else {
          window.removeEventListener('resize', handleScroll);
        }
      };
    };

    // Array to hold all cleanup functions
    const cleanupFunctions: (() => void)[] = [];

    // Setup listeners for all currently known genres
    genresToObserve.forEach((genre) => {
      // Wait a short moment for refs to attach after render
      const timeoutId = setTimeout(() => {
        const cleanup = setupListeners(genre);
        if (cleanup) {
          cleanupFunctions.push(cleanup);
        }
      }, 100); // Small delay might help ensure refs are ready
      cleanupFunctions.push(() => clearTimeout(timeoutId)); // Add timeout clearing to cleanup
    });

    // Return a single cleanup function that calls all individual cleanups
    return () => {
      console.log('Cleaning up all row listeners...');
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [selectedGenres, updateScrollButtons]); // Re-run if the list of genres changes

  // Jump-to function (keep as is)
  const handleGenreJump = (genre: string) => {
    const section = genreRefs.current[genre];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll function using Refs
  const scrollRow = (genre: string, direction: 'left' | 'right') => {
    const section = scrollContainerRefs.current[genre]; // Use ref
    if (section) {
      const scrollAmount = section.clientWidth * 0.75; // Scroll 75% of visible width
      section.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      // Buttons will update via scroll event listener
    }
  };

  // --- Filtering Logic (Keep as is) ---
  const genresWithRecs = selectedGenres.filter(
    (g) => recommendationsByGenre[g]?.length > 0
  );
  const genresWithoutRecs = selectedGenres.filter(
    (g) => !(recommendationsByGenre[g]?.length > 0) // Check correctly if recs exist
  );

  // --- JSX Rendering ---
  return (
    <AuthorizeView>
      <div
        className="bg-dark text-white min-vh-100"
        style={{ paddingTop: '80px' }}
      >
        <Navbar />
        <HeroCarousel movies={allMovies} />
        <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
          {/* Jump to Genre Dropdown */}
          <div className="d-flex justify-content-between align-items-center mb-4">
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

          {/* Loading Indicator */}
          {loading && (
            <p className="text-center my-5">
              Loading movies and recommendations...
            </p>
          )}

          {/* Rows with Recommendations */}
          {!loading &&
            genresWithRecs.map((genre) => {
              const recs = recommendationsByGenre[genre];
              const genreVisibility = buttonVisibility[genre] || {
                showLeft: false,
                showRight: false,
              }; // Default if state not ready

              return (
                <div
                  key={genre}
                  ref={(el) => {
                    genreRefs.current[genre] = el;
                  }}
                  style={{ scrollMarginTop: '120px' }}
                >
                  {/* Container for the row */}
                  <div className="movie-row-container mb-5">
                    <h3 className="mb-3">{formatGenre(genre)}</h3>
                    {/* Added relative positioning and group here */}
                    <div className="relative group">
                      {/* Left Button - Conditionally Render */}
                      {genreVisibility.showLeft && (
                        <button
                          className="scroll-btn scroll-btn-left"
                          onClick={() => scrollRow(genre, 'left')}
                        >
                          ‹
                        </button>
                      )}
                      {/* Scrollable Div - Attach Ref Here */}
                      <div
                        ref={(el) => {
                          scrollContainerRefs.current[genre] = el;
                        }}
                        // id={`scroll-${genre}`} // ID no longer needed for scrolling
                        className="horizontal-scroll-container"
                      >
                        {recs.map((movie) => (
                          <div
                            key={movie.showId}
                            className="movie-card snap-start"
                          >
                            {' '}
                            {/* Added snap-start */}
                            <Link to={`/Movie/${movie.showId}`}>
                              <MovieCard movie={movie} />
                            </Link>
                          </div>
                        ))}
                      </div>
                      {/* Right Button - Conditionally Render */}
                      {genreVisibility.showRight && (
                        <button
                          className="scroll-btn scroll-btn-right"
                          onClick={() => scrollRow(genre, 'right')}
                        >
                          ›
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Fallback Rows (Genres without Recs) */}
          {!loading &&
            genresWithoutRecs.map((genre) => {
              const fallbackMovies = allMovies.filter(
                (movie) => (movie as any)[genre] === 1
              );
              if (fallbackMovies.length === 0) return null; // Skip if no fallback movies for this genre
              const genreVisibility = buttonVisibility[genre] || {
                showLeft: false,
                showRight: false,
              }; // Default if state not ready

              return (
                <div
                  key={genre}
                  ref={(el) => {
                    genreRefs.current[genre] = el;
                  }}
                  style={{ scrollMarginTop: '120px' }}
                >
                  {/* Container for the row */}
                  <div className="movie-row-container mb-5">
                    <h3 className="mb-3">{formatGenre(genre)}</h3>
                    {/* Added relative positioning and group here */}
                    <div className="relative group">
                      {/* Left Button - Conditionally Render */}
                      {genreVisibility.showLeft && (
                        <button
                          className="scroll-btn scroll-btn-left"
                          onClick={() => scrollRow(genre, 'left')}
                        >
                          ‹
                        </button>
                      )}
                      {/* Scrollable Div - Attach Ref Here */}
                      <div
                        ref={(el) => {
                          scrollContainerRefs.current[genre] = el;
                        }}
                        // id={`scroll-${genre}`} // ID no longer needed for scrolling
                        className="horizontal-scroll-container"
                      >
                        {fallbackMovies.map((movie) => (
                          <div
                            key={movie.showId}
                            className="movie-card snap-start"
                          >
                            {' '}
                            {/* Added snap-start */}
                            <Link to={`/Movie/${movie.showId}`}>
                              <MovieCard movie={movie} />
                            </Link>
                          </div>
                        ))}
                      </div>
                      {/* Right Button - Conditionally Render */}
                      {genreVisibility.showRight && (
                        <button
                          className="scroll-btn scroll-btn-right"
                          onClick={() => scrollRow(genre, 'right')}
                        >
                          ›
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>{' '}
        {/* End max-w container */}
      </div>{' '}
      {/* End page div */}
    </AuthorizeView>
  );
};

export default Home;
