import React, { useEffect, useState, useCallback } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import NewMovieForm from '../../components/common/crud stuff/NewMovieForm';
import EditMovieForm from '../../components/common/crud stuff/EditMovieForm';
import MovieRow from '../../components/common/MovieRow';
import FilterDropdown from '../../components/common/GenreFilter';
import '../../components/common/crud stuff/MovieForm.css';

// --- Constants ---
const INITIAL_LOAD_LIMIT = 200; // Load this many movies initially

/**
 * Admin page for managing the movie catalog.
 * Includes add/edit/delete functionality, filtering, sorting,
 * and two views: table view and Netflix-style grouped-by-genre view.
 */
const ManageMoviesPage: React.FC = () => {
  // --- State for movie data and page state ---
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [netflixView, setNetflixView] = useState(false); // Toggle: table vs grouped view
  const [sortAsc, setSortAsc] = useState(true); // Sort A→Z or Z→A

  // --- Filter input state ---
  const [filters, setFilters] = useState({
    genres: [] as string[], // Filtering by a single genre at a time
    director: null as string | null,
    type: null as string | null,
    year: null as string | null,
    rating: null as string | null,
    title: '', // Title search input
  });

  // --- Debug log for mount/unmount lifecycle ---
  useEffect(() => {
    console.log('%c[ManageMoviesPage] mounted', 'color: gray;');
    return () =>
      console.warn('%c[ManageMoviesPage] unmounted', 'color: orange;');
  }, []);

  // --- Fetch movies from API ---
  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMovies(INITIAL_LOAD_LIMIT, 1, []);
      if (Array.isArray(res.movies)) {
        setMovies(res.movies);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error('[loadMovies] error:', err);
      setError('Failed to load movies.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Fetch movies on page load ---
  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // --- Delete a movie ---
  const handleDelete = async (id: string) => {
    if (!id || !window.confirm('Are you sure you want to delete this movie?'))
      return;
    try {
      await deleteMovie(id);
      loadMovies(); // Refresh after delete
    } catch (err) {
      console.error('[handleDelete] error:', err);
      alert('Failed to delete movie.');
    }
  };

  // --- Apply filtering and sorting on loaded movies ---
  const filteredAndSortedMovies = movies
    .filter((movie) => {
      const genreKey = filters.genres[0];
      const matchesGenre = !genreKey || (movie as any)[genreKey] === 1;
      const matchesDirector =
        filters.director === null ||
        (filters.director === 'No Director' && !movie.director) ||
        movie.director === filters.director;
      const matchesType = !filters.type || movie.type === filters.type;
      const matchesYear =
        !filters.year || String(movie.releaseYear) === filters.year;
      const matchesRating = !filters.rating || movie.rating === filters.rating;
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());

      return (
        matchesGenre &&
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

  // --- Helper to group filtered movies by genre ---
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

  // --- Render page content ---
  return (
    <div className="bg-dark text-white min-h-screen px-5 py-5">
      {/* --- Page Header --- */}
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
            Toggle User View
          </label>
        </div>
      </div>

      {/* --- Filters & Actions --- */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <button
          className="btn-generic-yellow"
          onClick={() => {
            setShowAddForm(true);
            setSelectedMovie(null);
          }}
        >
          + Add Movie
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
            Sort by Title: {sortAsc ? 'A → Z' : 'Z → A'}
          </button>
        </div>
      </div>

      {/* --- Movie Form Section --- */}
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

      {/* --- Movie List --- */}
      {!selectedMovie && !showAddForm && (
        <>
          {/* Loading/Error States */}
          {loading ? (
            <p className="text-center mt-4">Loading movies...</p>
          ) : error ? (
            <p className="text-danger text-center mt-4">{error}</p>
          ) : movies.length === 0 ? (
            <p className="text-center mt-4">No movies found.</p>
          ) : netflixView ? (
            // --- Netflix-style scrollable rows grouped by genre ---
            <div className="space-y-8">
              {Object.entries(groupByGenre()).map(([genre, genreMovies]) => (
                <MovieRow
                  key={genre}
                  title={genre}
                  movies={genreMovies}
                  onClick={(movie) => setSelectedMovie(movie)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            // --- Admin Table View ---
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
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn-generic-yellow"
                            onClick={() => setSelectedMovie(movie)}
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
        </>
      )}
    </div>
  );
};

export default ManageMoviesPage;
