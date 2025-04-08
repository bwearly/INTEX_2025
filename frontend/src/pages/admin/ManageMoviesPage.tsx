import React, { useEffect, useState } from 'react';
import { fetchMovies, deleteMovie } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
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
    setLoading(true);
    try {
      const response = await fetchMovies(200, 1, []);
      const movieList = Array.isArray(response) ? response : response.movies;
      console.log('Fetched movies:', movieList);
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

  const extractGenres = (movie: Movie): string[] => {
    const knownGenres = [
      'action',
      'adventure',
      'animation',
      'comedy',
      'crime',
      'documentary',
      'drama',
      'fantasy',
      'horror',
      'romance',
      'sci-fi',
      'thriller',
      'western',
      'children',
      'familyMovies',
      'musicals',
      'realityTv',
      'spirituality',
      'tvDramas',
      'tvAction',
      'tvComedies',
      'animeSeriesInternationalTvShows',
      'britishTvShowsDocuseriesInternationalTvShows',
      'comediesDramasInternationalMovies',
      'comediesInternationalMovies',
      'comediesRomanticMovies',
      'crimeTvShowsDocuseries',
      'documentariesInternationalMovies',
      'dramasInternationalMovies',
      'dramasRomanticMovies',
      'internationalMoviesThrillers',
      'internationalTvShowsRomanticTvShowsTvDramas',
      'kidsTv',
      'languageTvShows',
      'natureTv',
      'talkShowsTvComedies',
    ];
    return Object.entries(movie)
      .filter(([key, value]) => knownGenres.includes(key) && value === 1)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));
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
    if (genres.length === 0) genres.push('Uncategorized');
    genres.forEach((genre) => {
      if (!genreMap[genre]) genreMap[genre] = [];
      genreMap[genre].push(movie);
    });
  });

  return (
    <div className="bg-dark text-light min-vh-100">
      <div className="px-5 pt-5 mb-4">
        <h1 className="text-3xl font-bold">Welcome back, Admin! 👋</h1>
        <p className="text-muted mt-1">Manage your movie library below.</p>
      </div>

      <div className="px-5 flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Movie Collection</h2>
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
        ) : movies.length === 0 ? (
          <p className="text-muted">No movies found. Try adding one!</p>
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
