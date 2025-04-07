import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import {
  fetchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from '../../api/MoviesAPI';
import MovieRow from '../../components/common/MovieRow';
import AddMovie from '../../components/common/AddMovie';
import EditMovie from '../../components/common/EditMovie';

const PAGE_SIZE = 200;

const ManageMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | 'NEW' | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await fetchMovies(PAGE_SIZE, 1, []);
      setMovies(response.movies);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const extractGenres = (movie: Movie): string[] => {
    return Object.entries(movie)
      .filter(
        ([key, value]) =>
          typeof value === 'number' &&
          value === 1 &&
          !['releaseYear'].includes(key)
      )
      .map(([key]) => key);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMovie(Number(id));
      await loadMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const genreMap: Record<string, Movie[]> = {};
  movies.forEach((movie) => {
    const genres = extractGenres(movie);
    genres.forEach((genre) => {
      if (!genreMap[genre]) genreMap[genre] = [];
      genreMap[genre].push(movie);
    });
  });

  return (
    <div className="bg-dark text-light min-vh-100">
      <div className="px-5 pt-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Manage Movies</h1>
        <button
          onClick={() => setSelectedMovie('NEW')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Movie
        </button>
      </div>

      <div className="container-fluid px-5">
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          Object.entries(genreMap)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([genre, genreMovies]) => (
              <MovieRow
                key={genre}
                title={genre}
                movies={genreMovies}
                onClick={(movie) => setSelectedMovie(movie)}
              />
            ))
        )}
      </div>

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
      )}
    </div>
  );
};

export default ManageMoviesPage;
