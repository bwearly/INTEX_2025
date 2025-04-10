import React, { useEffect, useState, useCallback } from 'react'; // Removed useRef
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI'; // Adjust API import path
import { Movie } from '../../types/Movie'; // Adjust type import path
import NewMovieForm from '../../components/common/crud stuff/NewMovieForm'; // Adjust component path
import EditMovieForm from '../../components/common/crud stuff/EditMovieForm'; // Adjust component path
import MovieRow from '../../components/common/MovieRow'; // Adjust component path
import FilterDropdown from '../../components/common/GenreFilter'; // Adjust component path
import '../../components/common/crud stuff/MovieForm.css'; // Ensure CSS is linked

// No pagination constants needed

const ManageMoviesPage: React.FC = () => {
  // State needed
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Only need initial loading state
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

  // Removed all lazy loading state (page, hasMore, loadingMore, isLoadingMoreRef)

  // --- Load ALL Movies Function ---
  const loadMovies = useCallback(async () => {
    console.log('loadMovies called: Fetching ALL movies...');
    setLoading(true);
    setError(null);
    try {
      // Attempt to fetch all movies by requesting a very large page size on page 1
      // NOTE: Adjust limit if your API has a max page size or a better way to fetch all
      const VERY_LARGE_LIMIT = 10000;
      const res = await fetchMovies(VERY_LARGE_LIMIT, 1, []); // Fetch page 1, limit 10000

      if (res && res.movies && Array.isArray(res.movies)) {
        console.log(`API returned ${res.movies.length} movies.`);
        setMovies(res.movies); // Set the full list
      } else {
        console.warn('Invalid response or no movies array received.');
        setMovies([]);
      }
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError('Failed to load movies.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means function is created once

  // --- Initial Load Effect ---
  useEffect(() => {
    console.log('Initial load effect running...');
    loadMovies(); // Load all movies on mount
  }, [loadMovies]); // Run when component mounts

  // --- Scroll Event Listener Effect is REMOVED ---

  // --- Delete Function (Reloads all movies) ---
  const handleDelete = async (id: string) => {
    if (!id || id.trim() === '') {
      alert('Invalid movie ID.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      await deleteMovie(id);
      loadMovies(); // Reload the *entire* list after delete
    } catch (err) {
      console.error('Error deleting movie:', err);
      alert('Failed to delete movie. Please try again.');
    }
  };

  // --- Filtering and Sorting (Client-side on the FULL list) ---
  // This logic remains the same, but now operates on potentially all movies
  const filteredAndSortedMovies = movies
    .filter((movie) => {
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
    const grouped: Record<string, Movie[]> = {};
    filteredAndSortedMovies.forEach((movie) => {
      Object.keys(movie).forEach((key) => {
        if (
          (movie as any)[key] === 1 &&
          typeof (movie as any)[key] === 'number' &&
          !['releaseYear', 'showId'].includes(key)
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
          {/* FilterDropdown now gets potentially all movies */}
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
          {/* Call simple loadMovies on success */}
          <NewMovieForm
            onSuccess={() => {
              setShowAddForm(false);
              loadMovies();
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
      {selectedMovie && !showAddForm && (
        // Call simple loadMovies on success
        <EditMovieForm
          movie={selectedMovie}
          onSuccess={() => {
            setSelectedMovie(null);
            loadMovies();
          }}
          onCancel={() => setSelectedMovie(null)}
        />
      )}

      {/* --- Movie Display Area --- */}
      {!selectedMovie && !showAddForm && (
        <>
          {loading ? (
            <p className="text-center mt-4">Loading movies...</p> // Only initial loading indicator needed
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
                  {/* Lazy loading indicators removed */}
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
                  {/* Lazy loading indicators removed */}
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
