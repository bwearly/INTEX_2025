import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieById } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import { fetchYoutubeTrailer } from '../../api/YouTubeAPI';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerId, setTrailerId] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const getMovie = async () => {
      try {
        const data = await fetchMovieById(id);
        setMovie(data);

        // Delay before fetching the trailer
        setTimeout(async () => {
          const trailer = await fetchYoutubeTrailer(data.title);
          if (trailer) setTrailerId(trailer);
        }, 2000);
      } catch (err) {
        console.error('Error loading movie:', err);
      }
    };

    getMovie();
  }, [id]);

  if (!movie) return <div style={{ color: 'white' }}>Loading...</div>;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        overflowY: 'auto',
        paddingTop: '8vh',
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        style={{
          backgroundColor: '#111',
          borderRadius: '12px',
          padding: '2rem',
          display: 'flex',
          gap: '2rem',
          maxWidth: '1000px',
          width: '90%',
          color: 'white',
          boxShadow: '0 0 20px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            fontSize: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: '4px',
          }}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Trailer or Poster */}
        <div style={{ width: '400px', minWidth: '400px' }}>
          {trailerId ? (
            <iframe
              width="400"
              height="600"
              src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
              title="YouTube trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ borderRadius: '8px', border: 'none' }}
            />
          ) : (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              style={{ width: '400px', borderRadius: '8px' }}
            />
          )}
        </div>

        {/* Movie Info */}
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            {movie.title}
          </h1>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
