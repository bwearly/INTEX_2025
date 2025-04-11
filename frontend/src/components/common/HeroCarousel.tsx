import { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { useNavigate } from 'react-router-dom';

interface HeroCarouselProps {
  movies: Movie[];
}

const HeroCarousel = ({ movies }: HeroCarouselProps) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Automatically cycle through movies every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (movies.length === 0) return null;

  const featured = movies[index];
  const encodedTitle = encodeURIComponent(featured.title);
  const bgImage = `https://cinanicheposters.blob.core.windows.net/posters/${encodedTitle}.jpg`;

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'contain',
        height: '70vh',
        width: '100%',
        backgroundColor: '#000',
        position: 'relative',
        padding: '2rem',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Overlay content */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '1rem',
          borderRadius: '8px',
          maxWidth: '90%',
        }}
      >
        <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
          {featured.title}
        </h1>
        <p>{featured.description}</p>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
          {featured.releaseYear} | Rating: {featured.rating}
        </p>
        <button
          className="btn btn-outline-light btn-sm"
          onClick={() => navigate(`/movie/${featured.showId}`)}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
