import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { fetchMovies } from '../../api/MoviesAPI';
import NewMovieForm from '../../components/common/NewMovieForm';
import EditMovieForm from '../../components/common/EditMovieForm';
import MovieRow from '../../components/common/MovieRow';

const ManageMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [netflixView, setNetflixView] = useState(false);

  const loadMovies = async () => {
    try {
      const res = await fetchMovies(200, 1, []);
      setMovies(res.movies);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
  };

  const handleDelete = (id: string) => {
    // Your delete logic goes here if needed.
  };

  const groupByGenre = (): Record<string, Movie[]> => {
    const grouped: Record<string, Movie[]> = {};
    movies.forEach((movie) => {
      Object.entries(movie).forEach(([key, value]) => {
        if (value === 1 && typeof value === 'number') {
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(movie);
        }
      });
    });
    return grouped;
  };

  return (
    <div className="bg-dark text-white min-vh-100 pt-5 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Manage Movies</h1>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={netflixView}
            onChange={() => setNetflixView((prev) => !prev)}
          />
          Toggle Netflix View
        </label>
      </div>

      {netflixView ? (
        <div className="space-y-10">
          {Object.entries(groupByGenre()).map(([genre, genreMovies]) => (
            <MovieRow
              key={genre}
              title={genre}
              movies={genreMovies}
              onClick={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <>
          {!editingMovie && !showNewForm && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mb-4"
              onClick={() => setShowNewForm(true)}
            >
              Add New Movie
            </button>
          )}

          {editingMovie && (
            <EditMovieForm
              movie={editingMovie}
              onSuccess={() => {
                setEditingMovie(null);
                loadMovies();
              }}
              onCancel={() => setEditingMovie(null)}
            />
          )}

          {showNewForm && (
            <NewMovieForm
              onSuccess={() => {
                setShowNewForm(false);
                loadMovies();
              }}
              onCancel={() => setShowNewForm(false)}
            />
          )}

          {!editingMovie && !showNewForm && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Admin - Movies</h2>
              <table className="table-auto w-full text-white">
                <thead>
                  <tr>
                    <th className="text-left px-2 py-1">Title</th>
                    <th className="text-left px-2 py-1">Year</th>
                    <th className="text-left px-2 py-1">Director</th>
                    <th className="text-left px-2 py-1">Type</th>
                    <th className="text-left px-2 py-1">Rating</th>
                    <th className="text-left px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.showId} className="border-t border-gray-700">
                      <td className="px-2 py-1">{movie.title}</td>
                      <td className="px-2 py-1">{movie.releaseYear}</td>
                      <td className="px-2 py-1">{movie.director}</td>
                      <td className="px-2 py-1">{movie.type}</td>
                      <td className="px-2 py-1">{movie.rating}</td>
                      <td className="px-2 py-1 space-x-2">
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                          onClick={() => handleEdit(movie)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-gray-500 text-white px-2 py-1 rounded"
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
