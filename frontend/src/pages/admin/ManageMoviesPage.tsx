import { useEffect, useState } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import NewMovieForm from '../../components/common/crud stuff/NewMovieForm';
import EditMovieForm from '../../components/common/crud stuff/EditMovieForm';
import MovieRow from '../../components/common/MovieRow';

const ManageMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [netflixView, setNetflixView] = useState(false);

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

  const groupByGenre = (): Record<string, Movie[]> => {
    const grouped: Record<string, Movie[]> = {};
    movies.forEach((movie) => {
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin - Movies</h1>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={netflixView}
            onChange={() => setNetflixView(!netflixView)}
            className="mr-2"
          />
          Toggle User View
        </label>
      </div>

      {/* Add Movie Button */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
        onClick={() => {
          setShowAddForm(true);
          setSelectedMovie(null);
        }}
      >
        + Add Movie
      </button>

      {/* Add Movie Form (inline section, not replacing main view) */}
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

      {/* Edit Form (optional: currently still replaces view) */}
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

      {/* Main Movie View (table or Netflix-style row layout) */}
      {!selectedMovie && (
        <>
          {loading ? (
            <p>Loading movies...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
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
              <table className="table-auto w-full border border-gray-600">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Year</th>
                    <th className="px-4 py-2 border">Director</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Rating</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.showId} className="hover:bg-gray-700">
                      <td className="px-4 py-2 border">{movie.title}</td>
                      <td className="px-4 py-2 border">{movie.releaseYear}</td>
                      <td className="px-4 py-2 border">{movie.director}</td>
                      <td className="px-4 py-2 border">{movie.type}</td>
                      <td className="px-4 py-2 border">{movie.rating}</td>
                      <td className="px-4 py-2 border">
                        <button
                          className="bg-yellow-500 text-black px-3 py-1 rounded mr-2"
                          onClick={() => {
                            setSelectedMovie(movie);
                            setShowAddForm(false);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(movie.showId)}
                        >
                          Delete
                        </button>
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
