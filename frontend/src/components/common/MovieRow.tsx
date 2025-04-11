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

  // Determines whether scroll buttons should be shown
  const updateScrollButtons = React.useCallback(() => {
    const el = rowRef.current;
    if (el) {
      const canScrollLeft = el.scrollLeft > 1;
      const canScrollRight =
        Math.ceil(el.scrollLeft) + el.clientWidth < el.scrollWidth - 1;
      setShowLeft(canScrollLeft);
      setShowRight(canScrollRight);
    }
  }, [title]);

  // Scrolls the movie row left or right
  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    updateScrollButtons(); // Initial check

    // Watch for scroll or window resize to update button visibility
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    // ResizeObserver tracks content size changes
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateScrollButtons);
      observer.observe(el);
    }

    // Clean up listeners and observer
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
      if (observer) observer.disconnect();
    };
  }, [updateScrollButtons]);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="overflow-visible-wrapper mb-8">
      <div className="movie-row-wrapper">
        <div className="movie-row-container">
          {/* Row Title */}
          <h2 className="text-2xl font-semibold text-white mb-3 px-4">
            {title}
          </h2>

          <div className="group relative">
            {/* Scroll Left Button */}
            {showLeft && (
              <button
                className="scroll-btn scroll-btn-left"
                onClick={() => scroll('left')}
                aria-label={`Scroll ${title} left`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}

            {/* Scroll Right Button */}
            {showRight && (
              <button
                className="scroll-btn scroll-btn-right"
                onClick={() => scroll('right')}
                aria-label={`Scroll ${title} right`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}

            {/* Movie Cards in Scrollable Row */}
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
