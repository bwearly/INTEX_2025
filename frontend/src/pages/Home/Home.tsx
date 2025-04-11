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

  // Ref for jump-to functionality
  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Ref for scrollable containers for each genre
  const scrollContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // State to manage button visibility for each genre's row
  const [buttonVisibility, setButtonVisibility] = useState<
    Record<string, ScrollButtonVisibility>
  >({});

  // --- Utility Functions ---
  const formatGenre = (genre: string) =>
    genre.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const normalizeGenreKey = (key: string) => {
    return key
      .replace(/Movies|TvShows?|Series/gi, '')
      .replace(/([A-Z])/g, (match) => match.toLowerCase())
      .replace(/[^a-z]/gi, '')
      .trim();
  };

  // --- Data Loading Effect ---
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const res = await fetchMovies(100, 1, []);
        // Ensure movies have unique IDs if needed downstream, filter if necessary
        const uniqueMovies = Array.from(
          new Map(res.movies.map((m) => [m.showId, m])).values()
        );
        setAllMovies(uniqueMovies);

        const genreSet = new Set<string>();
        uniqueMovies.forEach((movie) => {
          Object.keys(movie).forEach((key) => {
            // Improved check for valid genre keys (numeric value 1, not standard ID fields)
            if (
              (movie as any)[key] === 1 &&
              typeof (movie as any)[key] === 'number' &&
              !['releaseYear', 'duration', 'showId', 'id'].includes(
                key.toLowerCase()
              )
            ) {
              genreSet.add(key);
            }
          });
        });

        const genres = Array.from(genreSet).sort((a, b) =>
          formatGenre(a).localeCompare(formatGenre(b))
        );
        setSelectedGenres(genres);

        // Initialize button visibility state
        const initialVisibility: Record<string, ScrollButtonVisibility> = {};
        genres.forEach((genre) => {
          initialVisibility[genre] = { showLeft: false, showRight: false };
        });
        setButtonVisibility(initialVisibility);

        // --- Recommendation fetching ---
        console.log('Fetching watched titles...');
        const watchedRes = await fetch(
          'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/api/Recommendations/GetWatchedTitles',
          { credentials: 'include' }
        );
        if (!watchedRes.ok)
          throw new Error(
            `Failed to fetch watched titles: ${watchedRes.status}`
          );
        const watchedIds: string[] = await watchedRes.json();
        console.log(`Found ${watchedIds.length} watched titles.`);

        const genreRecs: Record<string, Movie[]> = {};
        console.log('Fetching recommendations for genres:', genres);
        for (const rawGenre of genres) {
          const normalizedKey = normalizeGenreKey(rawGenre);
          if (!recommenderMapByColumn[normalizedKey]) {
            console.warn(
              `No recommender API mapped for: ${normalizedKey} (Raw: ${rawGenre})`
            );
            continue;
          }

          let found = false;
          // Limit iterations for performance if watchedIds is huge?
          const relevantWatchedIds = watchedIds.slice(0, 10); // Example: Use first 10 watched

          for (const showId of relevantWatchedIds) {
            try {
              console.log(
                `Getting recs for ${normalizedKey} based on ${showId}`
              );
              const ids = await recommenderMapByColumn[normalizedKey](showId);
              if (ids && ids.length > 0) {
                console.log(`Found ${ids.length} rec IDs for ${normalizedKey}`);
                const recMovies = await fetchMoviesByIds(ids);
                // Filter out movies already present in the recommendations for this genre to avoid duplicates
                genreRecs[rawGenre] = Array.from(
                  new Map(recMovies.map((m) => [m.showId, m])).values()
                );
                found = true;
                console.log(
                  `Workspaceed ${recMovies.length} movies for ${rawGenre}`
                );
                break; // Found recs based on one watched ID, move to next genre
              }
            } catch (err) {
              console.error(
                `Failed to get/process ${rawGenre} recs for ${showId}:`,
                err instanceof Error ? err.message : err
              );
            }
          }
          if (!found) {
            console.log(
              `No recommendations found for ${rawGenre} based on watched list.`
            );
          }
        }
        setRecommendationsByGenre(genreRecs);
        console.log('Finished fetching all recommendations.');
        // --- End Recommendation fetching ---
      } catch (err) {
        console.error('Failed during initial data load:', err);
        // Set state appropriately on error?
        setSelectedGenres([]);
        setRecommendationsByGenre({});
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []); // Load only once on mount

  // --- Scroll Button Logic ---
  const updateScrollButtons = useCallback((genre: string) => {
    const el = scrollContainerRefs.current[genre];
    if (el) {
      const tolerance = 2; // Increase tolerance slightly
      const canScrollLeft = el.scrollLeft > tolerance;
      const canScrollRight =
        Math.ceil(el.scrollLeft) + el.clientWidth < el.scrollWidth - tolerance;

      setButtonVisibility((prev) => {
        const currentVisibility = prev[genre] || {
          showLeft: false,
          showRight: false,
        };
        if (
          currentVisibility.showLeft !== canScrollLeft ||
          currentVisibility.showRight !== canScrollRight
        ) {
          // console.log(`Updating buttons for "${genre}": L=${canScrollLeft}, R=${canScrollRight}`);
          return {
            ...prev,
            [genre]: { showLeft: canScrollLeft, showRight: canScrollRight },
          };
        }
        return prev;
      });
    }
  }, []); // Depends only on refs, state setter

  // Effect to manage listeners for each row
  useEffect(() => {
    const observers: Record<string, ResizeObserver> = {};
    const elementsWithListeners: { el: HTMLDivElement; handler: () => void }[] =
      [];

    const setupListeners = (genre: string) => {
      const el = scrollContainerRefs.current[genre];
      if (!el) {
        // console.warn(`Ref for genre "${genre}" not ready yet.`);
        return null; // Indicate setup failed for now
      }

      // Define handler specific to this genre
      const handleScrollOrResize = () => updateScrollButtons(genre);

      // Initial calculation
      handleScrollOrResize(); // Call immediately

      // Scroll listener
      el.addEventListener('scroll', handleScrollOrResize, { passive: true });
      elementsWithListeners.push({ el, handler: handleScrollOrResize }); // Store for cleanup

      // Resize observer
      let observer: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(handleScrollOrResize);
        observer.observe(el);
        observers[genre] = observer;
      } else {
        window.addEventListener('resize', handleScrollOrResize); // Fallback
      }

      // Return cleanup function
      return () => {
        el.removeEventListener('scroll', handleScrollOrResize);
        if (observer) {
          observer.disconnect();
        } else {
          window.removeEventListener('resize', handleScrollOrResize);
        }
      };
    };

    const cleanupFunctions: (() => void)[] = [];
    // console.log(`Setting up listeners for ${selectedGenres.length} genres.`);

    // Attempt to set up listeners. If refs aren't ready, try again shortly.
    // This complexity suggests a dedicated Row component might be cleaner.
    let setupAttempts = 0;
    const maxAttempts = 5;
    let intervalId: NodeJS.Timeout | null = null;

    const trySetup = () => {
      setupAttempts++;
      let allSetup = true;
      cleanupFunctions.length = 0; // Clear previous attempts' partial cleanups

      selectedGenres.forEach((genre) => {
        const cleanup = setupListeners(genre);
        if (cleanup) {
          cleanupFunctions.push(cleanup);
        } else {
          allSetup = false; // Ref wasn't ready for this genre
        }
      });

      if (allSetup || setupAttempts >= maxAttempts) {
        // console.log(`Listeners setup complete (All: ${allSetup}, Attempts: ${setupAttempts}).`);
        if (intervalId) clearInterval(intervalId);
      } else {
        // console.log(`Refs not ready, will retry setup... (Attempt ${setupAttempts})`);
      }
    };

    intervalId = setInterval(trySetup, 200); // Try every 200ms up to maxAttempts
    trySetup(); // Initial attempt

    // Return master cleanup
    return () => {
      // console.log("Cleaning up all Home page row listeners...");
      if (intervalId) clearInterval(intervalId);
      cleanupFunctions.forEach((cleanup) => cleanup());
      // Also disconnect any observers stored directly if interval cleared early
      Object.values(observers).forEach((obs) => obs.disconnect());
    };
  }, [selectedGenres, updateScrollButtons]); // Rerun if genres change

  // --- Interaction Functions ---
  const handleGenreJump = (genre: string) => {
    const section = genreRefs.current[genre];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollRow = (genre: string, direction: 'left' | 'right') => {
    const section = scrollContainerRefs.current[genre];
    if (section) {
      const scrollAmount = section.clientWidth * 0.8; // Scroll 80%
      section.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // --- Filtering Logic for Display ---
  // Memoize filtering results for performance
  const genresWithRecs = React.useMemo(
    () => selectedGenres.filter((g) => recommendationsByGenre[g]?.length > 0),
    [selectedGenres, recommendationsByGenre]
  );

  const genresWithoutRecs = React.useMemo(
    () =>
      selectedGenres.filter((g) => !(recommendationsByGenre[g]?.length > 0)),
    [selectedGenres, recommendationsByGenre]
  );

  // --- JSX Rendering ---
  return (
    <AuthorizeView>
      <div
        className="bg-dark text-white min-vh-100"
        style={{ paddingTop: '80px' }}
      >
        <Navbar />
        {/* Render Hero only if movies are loaded */}
        {allMovies.length > 0 && <HeroCarousel movies={allMovies} />}
        {/* Main content area */}
        <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
          {/* Jump to Genre Dropdown */}
          {selectedGenres.length > 0 && ( // Only show if genres exist
            <div className="d-flex justify-content-between align-items-center mb-4">
              <select
                className="form-select w-auto bg-dark text-white border-secondary"
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
          )}

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
              };

              return (
                // Outer div for jump-to ref and margin/padding
                <div
                  key={`${genre}-rec`}
                  ref={(el) => {
                    genreRefs.current[genre] = el;
                  }}
                  style={{ scrollMarginTop: '120px' }}
                  className="mb-8"
                >
                  {/* Container for title and the scroll group */}
                  <div className="movie-row-container">
                    <h3 className="mb-3 px-4 md:px-0">{formatGenre(genre)}</h3>{' '}
                    {/* Added padding consistency */}
                    {/* This div needs 'position: relative' (via 'relative' class) and 'group' for hover */}
                    <div className="relative group">
                      {/* Left Button */}
                      {genreVisibility.showLeft && (
                        <button
                          className="scroll-btn scroll-btn-left"
                          onClick={() => scrollRow(genre, 'left')}
                          aria-label={`Scroll ${formatGenre(genre)} left`}
                        >
                          ‹
                        </button>
                      )}
                      {/* Scrollable Div */}
                      <div
                        ref={(el) => {
                          scrollContainerRefs.current[genre] = el;
                        }}
                        className="horizontal-scroll-container"
                      >
                        {recs.map((movie) => (
                          <div
                            key={movie.showId}
                            className="movie-card snap-start"
                          >
                            <Link to={`/Movie/${movie.showId}`}>
                              <MovieCard movie={movie} />
                            </Link>
                          </div>
                        ))}
                      </div>
                      {/* Right Button */}
                      {genreVisibility.showRight && (
                        <button
                          className="scroll-btn scroll-btn-right"
                          onClick={() => scrollRow(genre, 'right')}
                          aria-label={`Scroll ${formatGenre(genre)} right`}
                        >
                          ›
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Fallback Rows */}
          {!loading &&
            genresWithoutRecs.map((genre) => {
              const fallbackMovies = allMovies.filter(
                (movie) => (movie as any)[genre] === 1
              );
              if (fallbackMovies.length === 0) return null;
              const genreVisibility = buttonVisibility[genre] || {
                showLeft: false,
                showRight: false,
              };

              return (
                // Outer div for jump-to ref and margin/padding
                <div
                  key={`${genre}-fallback`}
                  ref={(el) => {
                    genreRefs.current[genre] = el;
                  }}
                  style={{ scrollMarginTop: '120px' }}
                  className="mb-8"
                >
                  {/* Container for title and the scroll group */}
                  <div className="movie-row-container">
                    <h3 className="mb-3 px-4 md:px-0">{formatGenre(genre)}</h3>{' '}
                    {/* Added padding consistency */}
                    {/* This div needs 'position: relative' (via 'relative' class) and 'group' for hover */}
                    <div className="relative group">
                      {/* Left Button */}
                      {genreVisibility.showLeft && (
                        <button
                          className="scroll-btn scroll-btn-left"
                          onClick={() => scrollRow(genre, 'left')}
                          aria-label={`Scroll ${formatGenre(genre)} left`}
                        >
                          ‹
                        </button>
                      )}
                      {/* Scrollable Div */}
                      <div
                        ref={(el) => {
                          scrollContainerRefs.current[genre] = el;
                        }}
                        className="horizontal-scroll-container"
                      >
                        {fallbackMovies.map((movie) => (
                          <div
                            key={movie.showId}
                            className="movie-card snap-start"
                          >
                            <Link to={`/Movie/${movie.showId}`}>
                              <MovieCard movie={movie} />
                            </Link>
                          </div>
                        ))}
                      </div>
                      {/* Right Button */}
                      {genreVisibility.showRight && (
                        <button
                          className="scroll-btn scroll-btn-right"
                          onClick={() => scrollRow(genre, 'right')}
                          aria-label={`Scroll ${formatGenre(genre)} right`}
                        >
                          ›
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Message if no rows could be displayed */}
          {!loading &&
            genresWithRecs.length === 0 &&
            genresWithoutRecs.length === 0 && (
              <p className="text-center my-5 text-gray-500">
                No movies to display based on current data.
              </p>
            )}
        </div>{' '}
        {/* End max-w container */}
      </div>{' '}
      {/* End page div */}
    </AuthorizeView>
  );
};

export default Home;
