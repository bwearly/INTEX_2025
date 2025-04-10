import { useEffect, useState } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import NewMovieForm from '../../components/common/crud stuff/NewMovieForm';
import EditMovieForm from '../../components/common/crud stuff/EditMovieForm';
import MovieRow from '../../components/common/MovieRow';
import FilterDropdown from '../../components/common/GenreFilter';
import '../../components/common/crud stuff/MovieForm.css';

const ManageMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
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

  const loadMovies = async () => {
    setLoading(true);
    try {
      const res = await fetchMovies(200, 1, []);
      setMovies(res.movies);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (id: string) => {
    if (!id || id.trim() === '') {
      alert('Invalid movie ID.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    try {
      await deleteMovie(id);
      await loadMovies();
    } catch (err) {
      console.error('Error deleting movie:', err);
      alert('Failed to delete movie. Please try again.');
    }
  };

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

  const groupByGenre = (): Record<string, Movie[]> => {
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

  return (
    <div className="bg-dark text-white min-h-screen px-5 py-5">
      <div className="d-flex justify-between align-items-center mb-4">
        <h1 className="text-2xl font-bold">Admin - Movies</h1>
        <div className="form-check form-switch ms-auto d-flex align-items-center">
          <input
            className="form-check-input uk-switch"
            type="checkbox"
            id="userViewSwitch"
            checked={netflixView}
            onChange={() => setNetflixView(!netflixView)}
          />
          <label
            className="form-check-label text-white ms-2"
            htmlFor="userViewSwitch"
          >
            Toggle User View
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

      {showAddForm && (
        <div className="my-4 p-4 border border-gray-700 rounded bg-gray-800">
          <NewMovieForm
            onSuccess={() => {
              setShowAddForm(false);
              loadMovies();
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {selectedMovie && (
        <EditMovieForm
          movie={selectedMovie}
          onSuccess={() => {
            setSelectedMovie(null);
            loadMovies();
          }}
          onCancel={() => setSelectedMovie(null)}
        />
      )}

      {!selectedMovie && (
        <>
          {loading ? (
            <p>Loading movies...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : netflixView ? (
            <div className="space-y-8">
              {Object.entries(groupByGenre()).map(([genre, genreMovies]) => (
                <MovieRow
                  key={genre}
                  title={genre}
                  movies={genreMovies}
                  onClick={(movie) => {
                    setSelectedMovie(movie);
                    setShowAddForm(false);
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
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
                            onClick={() => {
                              setSelectedMovie(movie);
                              setShowAddForm(false);
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
        </>
      )}
    </div>
  );
};

export default ManageMoviesPage;
