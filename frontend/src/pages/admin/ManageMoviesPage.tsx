import { useEffect, useState } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import NewMovieForm from '../../components/common/NewMovieForm';
import EditMovieForm from '../../components/common/EditMovieForm';

const ManageMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

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
    console.log('Attempting to delete movie with ID:', id); // 👈 DEBUG HERE

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

  return (
    <div className="bg-dark text-white min-h-screen px-5 py-5">
      <h1 className="text-2xl font-bold mb-4">Admin - Movies</h1>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
        onClick={() => {
          setShowAddForm(true);
          setSelectedMovie(null);
        }}
      >
        + Add Movie
      </button>

      {showAddForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowAddForm(false);
            loadMovies();
          }}
          onCancel={() => setShowAddForm(false)}
        />
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

      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
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
    </div>
  );
};

export default ManageMoviesPage;
