import React, { useRef, useState, useEffect } from 'react';
import { Movie } from '../../types/Movie';
import MovieCard from './MovieCard';
import './HorizontalScroll.css';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  onClick,
  onDelete,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);

  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 400;
      rowRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeft(rowRef.current.scrollLeft > 0);
    }
  };

  useEffect(() => {
    const ref = rowRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row-container mb-8 px-4">
      <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>

      <div className="group relative">
        {/* Left Scroll Button (only visible after scroll) */}
        {showLeft && (
          <button
            className="scroll-btn scroll-btn-left"
            onClick={() => scroll('left')}
          >
            ‹
          </button>
        )}

        {/* Right Scroll Button (always visible on hover) */}
        <button
          className="scroll-btn scroll-btn-right"
          onClick={() => scroll('right')}
        >
          ›
        </button>

        <div className="horizontal-scroll-container" ref={rowRef}>
          {movies.map((movie) => (
            <div key={movie.showId} className="movie-card snap-start">
              <MovieCard movie={movie} onClick={onClick} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
