// src/components/common/MovieRow.tsx
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
  const [showRight, setShowRight] = useState(false);

  const updateScrollButtons = () => {
    const el = rowRef.current;
    if (el) {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = 400;
      rowRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="overflow-visible-wrapper">
      <div className="movie-row-wrapper">
        <div className="movie-row-container">
          <h2 className="text-2xl font-semibold text-white mb-3 px-4">
            {title}
          </h2>

          <div className="group relative">
            {showLeft && (
              <button
                className="scroll-btn scroll-btn-left"
                onClick={() => scroll('left')}
              >
                ‹
              </button>
            )}
            {showRight && (
              <button
                className="scroll-btn scroll-btn-right"
                onClick={() => scroll('right')}
              >
                ›
              </button>
            )}

            <div className="horizontal-scroll-container" ref={rowRef}>
              {movies.map((movie) => (
                <div key={movie.showId} className="movie-card snap-start">
                  <MovieCard
                    movie={movie}
                    onClick={onClick}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
