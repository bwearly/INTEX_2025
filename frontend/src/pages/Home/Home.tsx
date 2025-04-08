import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';

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
<<<<<<< HEAD
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
=======
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
            {allMovies.map((movie) => {
              const encodedTitle = encodeURIComponent(movie.title);
              const posterUrl = `https://cinanicheposters.blob.core.windows.net/posters/${encodedTitle}.jpg`;

              return (
>>>>>>> parent of e049087 (added a ton of security and cookies)
                <div
                  key={movie.showId}
                  style={{
                    width: '150px',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  <img
<<<<<<< HEAD
                    src={movie.posterUrl}
=======
                    src={posterUrl}
>>>>>>> parent of e049087 (added a ton of security and cookies)
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                    }}
                    onError={(e) =>
<<<<<<< HEAD
                      ((e.target as HTMLImageElement).src = '/images.png')
=======
                      ((e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/150x220?text=No+Image')
>>>>>>> parent of e049087 (added a ton of security and cookies)
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
<<<<<<< HEAD
              ))}
            </div>
          )}
        </div>
=======
              );
            })}
          </div>
        )}
>>>>>>> parent of e049087 (added a ton of security and cookies)
      </div>
    </div>
  );
};

export default Home;
