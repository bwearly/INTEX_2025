import React, { useEffect, useState, useCallback } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI'; // Adjust API import path
// Assuming Movie type might have a genres array - adjust if needed!
import { Movie } from '../../types/Movie'; // Adjust type import path if necessary
import NewMovieForm from '../../components/common/crud stuff/NewMovieForm'; // Adjust component path
import EditMovieForm from '../../components/common/crud stuff/EditMovieForm'; // Adjust component path
import MovieRow from '../../components/common/MovieRow'; // Adjust component path
import FilterDropdown from '../../components/common/GenreFilter'; // Adjust component path
import '../../components/common/crud stuff/MovieForm.css'; // Ensure CSS is linked

// --- Configuration ---
const INITIAL_LOAD_LIMIT = 200; // Load up to 200 movies initially

const ManageMoviesPage: React.FC = () => {
  // State needed
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true); // Only need initial loading state
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [netflixView, setNetflixView] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  // Filters state remains
  const [filters, setFilters] = useState({
    genres: [] as string[], // Expecting zero or one genre from FilterDropdown
    director: null as string | null,
    type: null as string | null,
    year: null as string | null,
    rating: null as string | null,
    title: '',
  });

  // Mount/Unmount Logging (Optional - kept for debugging if needed)
  useEffect(() => {
    console.log('%cManageMoviesPage Component MOUNTED', 'color: gray;');
    return () => {
      console.warn('%cManageMoviesPage Component UNMOUNTED', 'color: orange;');
    };
  }, []);

  // --- Load Initial Movies Function ---
  const loadMovies = useCallback(async () => {
    console.log(
      `loadMovies called: Fetching initial batch (limit ${INITIAL_LOAD_LIMIT})`
    );
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMovies(INITIAL_LOAD_LIMIT, 1, []);

      if (res && res.movies && Array.isArray(res.movies)) {
        console.log(`API returned ${res.movies.length} movies.`);
        setMovies(res.movies);
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
  }, []);

  // --- Initial Load Effect ---
  useEffect(() => {
    console.log('Initial load effect running...');
    loadMovies(); // Load the initial batch
  }, [loadMovies]);

  // --- Delete Function (Reloads movies) ---
  const handleDelete = async (id: string) => {
    if (!id || id.trim() === '') {
      alert('Invalid movie ID.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      await deleteMovie(id);
      loadMovies(); // Reload the list after delete
    } catch (err) {
      console.error('Error deleting movie:', err);
      alert('Failed to delete movie. Please try again.');
    }
  };

  // --- Filtering and Sorting (Client-side on the loaded batch) ---
  const filteredAndSortedMovies = movies
    .filter((movie) => {
      // --- Updated Genre Filter Logic ---
      // Assumes movie object has a 'genres' array property (e.g., movie.genres = ["Action", "Drama"])
      // Adjust 'movie.genres' if your property name is different!
      const selectedGenreLower = filters.genres[0]; // The lowercase genre string from the filter state
      const matchesGenres =
        !selectedGenreLower || // Pass if 'All' genres selected (filters.genres is empty)
        (movie.genres &&
          Array.isArray(movie.genres) && // Check if movie.genres exists and is an array
          movie.genres.some((g) => g.toLowerCase() === selectedGenreLower)); // Check if any genre in the movie's array matches (case-insensitive)
      // --- End Updated Genre Filter Logic ---

      // Other filters...
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

      // Optional: Log the filtering result for a specific movie if debugging
      // if (movie.title === "Specific Movie Title") {
      //    console.log(`Filtering "${movie.title}": Selected='${selectedGenreLower}', MovieGenres='${movie.genres?.join(',')}', Matches=${matchesGenres}`);
      // }

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
  // This assumes your original logic for grouping was based on flag properties (e.g., movie.action=1)
  // If filtering now relies on movie.genres array, this grouping might need adjustment too.
  // Keeping original logic for now, but be aware it might not align with the new filter logic.
  const groupByGenre = (): Record<string, Movie[]> => {
    const grouped: Record<string, Movie[]> = {};
    filteredAndSortedMovies.forEach((movie) => {
      Object.keys(movie).forEach((key) => {
        // Basic check: is the key a property with value 1 (and not year/id)? Refine if needed.
        // This check might need updating if your movie structure uses an array for genres.
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
          {/* Ensure FilterDropdown is rendered correctly ONCE */}
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
            <p className="text-center mt-4">Loading movies...</p>
          ) : error ? (
            <p className="text-danger text-center mt-4">{error}</p>
          ) : movies.length === 0 ? (
            <p className="text-center mt-4"> No movies found. </p> // Simplified message
          ) : (
            /* Render Table or Netflix View */
            <>
              {netflixView /* Netflix View */ ? (
                <div className="space-y-8">
                  {/* This uses groupByGenre - make sure its logic matches movie structure */}
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
                    {/* Ensure filteredAndSortedMovies is used here */}
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
                </div>
              )}
              {/* No lazy loading indicators */}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ManageMoviesPage;
