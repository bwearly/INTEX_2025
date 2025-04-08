import React, { useEffect, useState } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import AddMovie from '../../components/common/AddMovie';
import EditMovie from '../../components/common/EditMovie';
import AuthorizeView from '../../components/auth/AuthorizeView';

const ManageMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | 'NEW' | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const response = await fetchMovies(200, 1, []);
      const movieList = Array.isArray(response) ? response : response.movies;
      setMovies(movieList);
    } catch (err) {
      console.error('Failed to load movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteMovie(Number(id));
      await loadMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <AuthorizeView>
      <div className="bg-dark text-white min-vh-100 px-5 py-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Movie Collection</h1>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setSelectedMovie('NEW')}
          >
            + Add Movie
          </button>
        </div>

        {loading ? (
          <p>Loading movies...</p>
        ) : movies.length === 0 ? (
          <p>No movies found. Try adding one!</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {movies.map((movie) => {
              const encodedTitle = encodeURIComponent(movie.title);
              const posterUrl = `https://cinanicheposters.blob.core.windows.net/posters/${encodedTitle}.jpg`;
              return (
                <div key={movie.showId} className="w-[150px] text-center">
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full rounded cursor-pointer"
                    onClick={() => setSelectedMovie(movie)}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/150x220?text=No+Image')
                    }
                  />
                  <p className="font-bold mt-2">{movie.title}</p>
                  <p className="text-sm text-gray-400">{movie.releaseYear}</p>
                  <div className="flex gap-2 justify-center mt-2">
                    <button
                      className="bg-yellow-500 text-black px-2 py-1 rounded"
                      onClick={() => setSelectedMovie(movie)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(movie.showId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedMovie === 'NEW' && (
          <AddMovie
            onSuccess={() => {
              loadMovies();
              setSelectedMovie(null);
            }}
            onCancel={() => setSelectedMovie(null)}
          />
        )}

        {selectedMovie && selectedMovie !== 'NEW' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <EditMovie
              movie={selectedMovie}
              onSuccess={() => {
                loadMovies();
                setSelectedMovie(null);
              }}
              onCancel={() => setSelectedMovie(null)}
              onDelete={() => {
                if (selectedMovie?.showId) {
                  handleDelete(selectedMovie.showId);
                  setSelectedMovie(null);
                }
              }}
            />
          </div>
        )}
      </div>
    </AuthorizeView>
  );
};

export default ManageMoviesPage;
