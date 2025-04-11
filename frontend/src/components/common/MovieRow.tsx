// src/components/common/MovieRow.tsx (with logging)
import React, { useRef, useState, useEffect } from 'react';
import { Movie } from '../../types/Movie';
import MovieCard from './MovieCard';
import './HorizontalScroll.css'; // Make sure this path is correct

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void; // Added from your code
}

const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  onClick,
  onDelete, // Added from your code
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // Use useCallback to potentially optimize listener removal/addition if needed, though likely minor here
  const updateScrollButtons = React.useCallback(() => {
    const el = rowRef.current;
    if (el) {
      // Add a small tolerance (e.g., 1px) for calculations
      const canScrollLeft = el.scrollLeft > 1;
      const canScrollRight =
        Math.ceil(el.scrollLeft) + el.clientWidth < el.scrollWidth - 1;

      // --- Logging ---
      console.log(
        `Row "${title}": scrollLeft=${el.scrollLeft.toFixed(1)}, clientWidth=${el.clientWidth}, scrollWidth=${el.scrollWidth}, Potential Right Scroll=${(el.scrollWidth - el.clientWidth - el.scrollLeft).toFixed(1)}, showLeft=${canScrollLeft}, showRight=${canScrollRight}`
      );
      // --- End Logging ---

      setShowLeft(canScrollLeft);
      setShowRight(canScrollRight);
    } else {
      console.log(`Row "${title}": rowRef.current is null during update`);
    }
  }, [title]); // Add title to dependency if it can change, otherwise useCallback is static

  const scroll = (dir: 'left' | 'right') => {
    if (rowRef.current) {
      // Using clientWidth for potentially more responsive scroll amount
      const scrollAmount = rowRef.current.clientWidth * 0.75; // Scroll 75% of visible width
      rowRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      // Note: scrollBy doesn't trigger 'scroll' event immediately after finishing
      // We might need to manually update buttons after a short delay if needed
      // setTimeout(updateScrollButtons, 350); // Optional: update after scroll animation (adjust delay)
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    // Initial check
    updateScrollButtons();

    // Add listeners
    el.addEventListener('scroll', updateScrollButtons, { passive: true }); // Use passive listener for scroll perf
    window.addEventListener('resize', updateScrollButtons);

    // --- Observer for content changes (More Advanced) ---
    // If cards load lazily or content changes dynamically *after* initial mount,
    // a ResizeObserver might be needed for perfect accuracy.
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateScrollButtons);
      observer.observe(el); // Observe the scroll container itself
      console.log(`Row "${title}": ResizeObserver attached.`);
    } else {
      console.log(`Row "${title}": ResizeObserver not supported.`);
    }
    // --- End Observer ---

    // Cleanup
    return () => {
      console.log(`Row "${title}": Cleaning up listeners`);
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
      if (observer) {
        console.log(`Row "${title}": Disconnecting ResizeObserver`);
        observer.disconnect();
      }
    };
    // updateScrollButtons is memoized with useCallback, safe to include
    // If title/movies could change and affect layout, they might need adding,
    // but often rows are relatively static once rendered.
  }, [updateScrollButtons]);

  // Render null if no movies
  if (!movies || movies.length === 0) return null;

  return (
    // Ensure parent allows overflow if buttons are positioned outside bounds
    <div className="overflow-visible-wrapper mb-8">
      {' '}
      {/* Added margin-bottom */}
      <div className="movie-row-wrapper">
        <div className="movie-row-container">
          <h2 className="text-2xl font-semibold text-white mb-3 px-4">
            {title}
          </h2>

          {/* Group for hover effect */}
          <div className="group relative">
            {/* Left Button */}
            {showLeft && (
              <button
                className="scroll-btn scroll-btn-left"
                onClick={() => scroll('left')}
                aria-label={`Scroll ${title} left`} // Accessibility
              >
                {/* SVG Icon (example) */}
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

            {/* Right Button */}
            {/* Always render right button if scrollWidth > clientWidth initially, then rely on state? */}
            {/* Or just use state as is */}
            {showRight && (
              <button
                className="scroll-btn scroll-btn-right"
                onClick={() => scroll('right')}
                aria-label={`Scroll ${title} right`} // Accessibility
              >
                {/* SVG Icon (example) */}
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

            {/* Scrollable Container */}
            <div
              className="horizontal-scroll-container"
              ref={rowRef}
              // Add role for accessibility if appropriate
              // role="region"
              // aria-label={`${title} movies`}
            >
              {movies.map((movie) => (
                <div key={movie.showId} className="movie-card snap-start">
                  <MovieCard
                    movie={movie}
                    onClick={onClick}
                    onDelete={onDelete} // Pass down delete handler
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
