import React, { useEffect, useState, useCallback, useRef } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI'; // Adjust API import path
import { Movie } from '../../types/Movie'; // Adjust type import path
import NewMovieForm from '../../components/common/crud stuff/NewMovieForm'; // Adjust component path
import EditMovieForm from '../../components/common/crud stuff/EditMovieForm'; // Adjust component path
import MovieRow from '../../components/common/MovieRow'; // Adjust component path
import FilterDropdown from '../../components/common/GenreFilter'; // Adjust component path
import '../../components/common/crud stuff/MovieForm.css'; // Ensure CSS is linked

// --- Configuration for Lazy Loading ---
const INITIAL_LOAD_COUNT = 20; // Load 20 movies initially
const SCROLL_LOAD_COUNT = 10; // Load 10 movies on subsequent scrolls

const ManageMoviesPage: React.FC = () => {
  // Existing State
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Loading state for initial page load
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [netflixView, setNetflixView] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({
    genres: [] as string[],
    director: null as string | null,
    type: null as string | null,
    year: null as string | null,
    rating: null as string | null,
    title: '',
  });

  // --- State Variables for Lazy Loading ---
  const [page, setPage] = useState(1); // Track the current page number loaded
  const [hasMore, setHasMore] = useState(true); // Flag to check if more movies can be loaded
  const [loadingMore, setLoadingMore] = useState(false); // Loading state specifically for fetching more pages

  // Ref to prevent fetching more while already fetching
  const isLoadingMoreRef = useRef(loadingMore);
  useEffect(() => {
    isLoadingMoreRef.current = loadingMore;
  }, [loadingMore]);

  // --- Load Movies Function (Handles Pagination) ---
  // Using the structure from the first working example
  const loadMovies = useCallback(
    async (currentPage: number, limit: number, currentMovies: Movie[] = []) => {
      const isInitialLoad = currentPage === 1;
      if (isInitialLoad) {
        setLoading(true);
        setError(null);
      } else {
        // Prevent fetching if already loading more
        if (loadingMore) return;
        setLoadingMore(true);
      }

      try {
        // *** Ensure fetchMovies API supports limit and currentPage ***
        const res = await fetchMovies(limit, currentPage, []); // Pass filters if needed

        if (res && res.movies && Array.isArray(res.movies)) {
          // Added Array check
          const newMovies = res.movies;
          // Append new movies for pages > 1, set for page 1
          setMovies(
            isInitialLoad ? newMovies : [...currentMovies, ...newMovies]
          );

          // *** Adjust this logic based on your API response ***
          setHasMore(newMovies.length === limit); // Assumes more if full page is returned
          setPage(currentPage);
        } else {
          setHasMore(false);
          if (isInitialLoad) setMovies([]);
        }
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        if (isInitialLoad) {
          setError('Failed to load movies.');
          setMovies([]);
        } else {
          console.error('Failed to load more movies.');
          setHasMore(false); // Stop trying on error
        }
      } finally {
        if (isInitialLoad) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      }
      // Dependency ensures we don't try to load more if already loading
    },
    [loadingMore]
  );

  // --- Initial Load Effect ---
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    loadMovies(1, INITIAL_LOAD_COUNT); // Load the first 20 movies
    // Add dependencies (e.g., filters) if they should trigger a reload
  }, [loadMovies]);

  // --- Scroll Event Listener Effect ---
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 500; // Pixels from bottom
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - threshold;

      // Use ref for immediate check of loading state
      if (nearBottom && hasMore && !isLoadingMoreRef.current) {
        console.log(
          `Scroll Triggered: Loading page ${page + 1} (10 movies)...`
        );
        // *** Use SCROLL_LOAD_COUNT here, passing current movies ***
        loadMovies(page + 1, SCROLL_LOAD_COUNT, movies);
      }
    };

    let timeoutId: NodeJS.Timeout | null = null;
    const debouncedHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 150); // Debounce delay
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    return () => {
      // Cleanup
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
    // Dependencies - includes movies because handleScroll passes it to loadMovies
  }, [hasMore, page, loadMovies, movies]);

  // --- Delete Function ---
  const handleDelete = async (id: string) => {
    if (!id || id.trim() === '') {
      alert('Invalid movie ID.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      await deleteMovie(id);
      // Instead of full reload, remove locally (more responsive)
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.showId !== id)
      );
      // Optional: Could check if movies.length is now very small and trigger loadMovies if hasMore
    } catch (err) {
      console.error('Error deleting movie:', err);
      alert('Failed to delete movie. Please try again.');
    }
  };

  // --- Filtering and Sorting (Client-side) ---
  const filteredAndSortedMovies = movies
    .filter((movie) => {
      // ... (your filter logic) ...
      const matchesGenres =
        filters.genres.length === 0 ||
        filters.genres.some((genre) => (movie as any)[genre] === 1);
      const matchesDirector =
        filters.director === null ||
        (filters.director === 'No Director' && !movie.director) ||
        movie.director === filters.director;
      const matchesType = filters.type === null || movie.type === filters.type;
      const matchesYear =
        filters.year === null || String(movie.releaseYear) === filters.year;
      const matchesRating =
        filters.rating === null || movie.rating === filters.rating;
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      return (
        matchesGenres &&
        matchesDirector &&
        matchesType &&
        matchesYear &&
        matchesRating &&
        matchesTitle
      );
    })
    .sort((a, b) =>
      sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

  // --- Grouping by Genre (Client-side) ---
  const groupByGenre = (): Record<string, Movie[]> => {
    // ... (your grouping logic) ...
    const grouped: Record<string, Movie[]> = {};
    filteredAndSortedMovies.forEach((movie) => {
      Object.keys(movie).forEach((key) => {
        if (
          (movie as any)[key] === 1 &&
          typeof (movie as any)[key] === 'number'
        ) {
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(movie);
        }
      });
    });
    return grouped;
  };

  // --- JSX Rendering ---
  return (
    <div className="bg-dark text-white min-h-screen px-5 py-5">
      {/* --- Header and Controls --- */}
      <div className="d-flex justify-between align-items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Console</h1>
        <div className="form-check form-switch ms-auto d-flex align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            id="userViewSwitch"
            checked={netflixView}
            onChange={() => setNetflixView(!netflixView)}
          />
          <label className="form-check-label ms-2" htmlFor="userViewSwitch">
            {' '}
            Toggle User View{' '}
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <button
          className="btn-generic-yellow"
          onClick={() => {
            setShowAddForm(true);
            setSelectedMovie(null);
          }}
        >
          {' '}
          + Add Movie{' '}
        </button>
        <div className="d-flex align-items-center gap-3">
          <FilterDropdown
            allMovies={movies}
            filters={filters}
            setFilters={setFilters}
          />
          <button
            className="btn btn-light"
            onClick={() => setSortAsc(!sortAsc)}
          >
            {' '}
            Sort by Title: {sortAsc ? 'A → Z' : 'Z → A'}{' '}
          </button>
        </div>
      </div>

      {/* --- Add/Edit Forms --- */}
      {showAddForm && (
        <div className="my-4 p-4 border border-secondary rounded bg-dark shadow-lg">
          {' '}
          <NewMovieForm
            onSuccess={() => {
              setShowAddForm(false);
              loadMovies(1, INITIAL_LOAD_COUNT);
            }}
            onCancel={() => setShowAddForm(false)}
          />{' '}
        </div>
      )}
      {selectedMovie && !showAddForm && (
        <EditMovieForm
          movie={selectedMovie}
          onSuccess={() => {
            setSelectedMovie(null);
            loadMovies(1, INITIAL_LOAD_COUNT);
          }}
          onCancel={() => setSelectedMovie(null)}
        />
      )}

      {/* --- Movie Display Area --- */}
      {!selectedMovie && !showAddForm && (
        <>
          {loading ? (
            <p className="text-center mt-4">Loading movies...</p>
          ) : error ? (
            <p className="text-danger text-center mt-4">{error}</p>
          ) : movies.length === 0 ? (
            <p className="text-center mt-4">
              {' '}
              No movies found matching your criteria.{' '}
            </p>
          ) : (
            /* Render Table or Netflix View */
            <>
              {netflixView /* Netflix View */ ? (
                <div className="space-y-8">
                  {Object.entries(groupByGenre()).map(
                    ([genre, genreMovies]) => (
                      <MovieRow
                        key={genre}
                        title={genre}
                        movies={genreMovies}
                        onClick={(movie) => {
                          setSelectedMovie(movie);
                        }}
                        onDelete={handleDelete}
                      />
                    )
                  )}
                  {/* Loading More / End Indicators */}
                  {loadingMore && (
                    <p className="text-center mt-4">Loading more movies...</p>
                  )}
                  {!loadingMore && !hasMore && movies.length > 0 && (
                    <p className="text-center mt-4 text-secondary">
                      {' '}
                      You've reached the end!{' '}
                    </p>
                  )}
                </div>
              ) : (
                /* Table View */
                <div className="overflow-x-auto">
                  <table className="table-admin">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th>Type</th>
                        <th>Rating</th>
                        <th style={{ width: '160px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedMovies.map((movie) => (
                        <tr key={movie.showId}>
                          <td>{movie.title}</td>
                          <td>{movie.releaseYear}</td>
                          <td>{movie.director}</td>
                          <td>{movie.type}</td>
                          <td>{movie.rating}</td>
                          <td>
                            {' '}
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn-generic-yellow"
                                onClick={() => {
                                  setSelectedMovie(movie);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn-delete-custom"
                                onClick={() => handleDelete(movie.showId)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Loading More / End Indicators */}
                  {loadingMore && (
                    <p className="text-center mt-4">Loading more movies...</p>
                  )}
                  {!loadingMore && !hasMore && movies.length > 0 && (
                    <p className="text-center mt-4 text-secondary">
                      {' '}
                      You've reached the end!{' '}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ManageMoviesPage;
