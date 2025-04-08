import React, { useEffect, useState } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import MovieRow from '../../components/common/MovieRow';
import AddMovie from '../../components/common/AddMovie';
import EditMovie from '../../components/common/EditMovie';

const ManageMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | 'NEW' | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await fetchMovies(200, 1, []);
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
      .filter(([_, value]) => typeof value === 'number' && value === 1)
      .map(([key]) => key);
  };

  const genreMap: Record<string, Movie[]> = {};
  movies.forEach((movie) => {
    const genres = extractGenres(movie);
    genres.forEach((genre) => {
      if (!genreMap[genre]) genreMap[genre] = [];
      genreMap[genre].push(movie);
    });
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteMovie(Number(id));
      await loadMovies();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Manage Movies</h1>
          <button
            onClick={() => setSelectedMovie('NEW')}
            className="btn btn-success"
          >
            + Add Movie
          </button>
        </div>

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
    </div>
  );
};

export default ManageMoviesPage;
