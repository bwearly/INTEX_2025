import { useEffect, useState } from 'react';
import { fetchTvShows } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import MovieCard from '../components/common/MovieCard';

const TvShowsPage = () => {
  const [shows, setShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTvShows = async () => {
      try {
        const res = await fetchTvShows(200, 1);
        setShows(res.movies);
      } catch (err) {
        console.error('Failed to load TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTvShows();
  }, []);

  return (
    <div className="text-white" style={{ paddingTop: '100px' }}>
      <div className="container">
        <h1 className="display-5 fw-bold mb-4">TV Shows</h1>
        {loading ? (
          <p>Loading...</p>
        ) : shows.length === 0 ? (
          <p>No TV shows found.</p>
        ) : (
          <div className="d-flex flex-wrap gap-4">
            {shows.map((show) => (
              <div key={show.showId} style={{ width: '150px' }}>
                <MovieCard movie={show} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TvShowsPage;
