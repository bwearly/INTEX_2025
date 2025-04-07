import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';

interface HeroCarouselProps {
  movies: Movie[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000); // auto-rotate every 3 seconds

    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentIndex];

  return (
    <div className="text-white py-4">
      {currentMovie && (
        <div className="d-flex flex-column align-items-center justify-content-center text-center bg-secondary rounded p-4 mx-auto" style={{ maxWidth: '600px' }}>
          <h3>{currentMovie.title}</h3>
          <p className="mb-1">{currentMovie.releaseYear}</p>
          <p className="text-light">{currentMovie.description}</p>
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
