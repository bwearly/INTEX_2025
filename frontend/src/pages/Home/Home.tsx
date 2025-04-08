import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';
import AuthorizeView from '../../components/auth/AuthorizeView';

const Home: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const response = await fetchMovies(200, 1, []);
        setAllMovies(response.movies);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <AuthorizeView>
      <div
        className="bg-dark text-white min-vh-100"
        style={{ paddingTop: '80px' }}
      >
        <Navbar />
        <HeroCarousel movies={allMovies} />
        <div className="container mt-5">
          <h2 className="text-white mb-3">All Movie Titles</h2>
          {loading ? (
            <p>Loading movies...</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {allMovies.map((movie) => (
                <div
                  key={movie.showId}
                  style={{
                    width: '150px',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                    }}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = '/images.png')
                    }
                  />
                  <p style={{ marginTop: '8px', fontWeight: 'bold' }}>
                    {movie.title}
                  </p>
                  <p
                    style={{
                      marginTop: '-8px',
                      fontSize: '0.9em',
                      color: '#bbb',
                    }}
                  >
                    {movie.releaseYear}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthorizeView>
  );
};

export default Home;
