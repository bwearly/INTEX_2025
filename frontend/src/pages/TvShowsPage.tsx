import { useEffect, useRef, useState } from 'react';
import { fetchTvShows } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import MovieCard from '../components/common/MovieCard';
import '../components/common/HorizontalScroll.css';

const TvShowsPage = () => {
  const [tvShows, setTvShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Initial guess of genres — we'll correct this after we log a real movie
  const tvGenres = [
    'fantasy',
    'tvComedies',
    'tvDramas',
    'realityTV',
    'talkShowsTvComedies',
    'languageTVShows',
    'spirituality',
  ];
  

  const formatGenre = (genre: string) =>
    genre
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());

  useEffect(() => {
    const loadShows = async () => {
      try {
        const res = await fetchTvShows(200, 1);
        setTvShows(res.movies);

        // ✅ Debug one TV show's fields
        console.log('Sample TV Show:', res.movies[0]);
      } catch (err) {
        console.error('Failed to load TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  const scrollRow = (genre: string, direction: 'left' | 'right') => {
    const section = document.getElementById(`scroll-${genre}`);
    if (section) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      section.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="text-white" style={{ paddingTop: '100px' }}>
      <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
        <h1 className="display-5 fw-bold mb-4">TV Shows</h1>

        {loading ? (
          <p>Loading TV shows...</p>
        ) : (
          tvGenres.map((genre) => {
            const showsForGenre = tvShows.filter(
              (show) => (show as any)[genre] === 1
            );

            if (showsForGenre.length === 0) return null;

            return (
              <div
                key={genre}
                ref={(el) => (genreRefs.current[genre] = el)}
                className="movie-row-container mb-5"
                style={{ scrollMarginTop: '120px' }}
              >
                <h3 className="mb-3">{formatGenre(genre)}</h3>
                <div className="group">
                  <button
                    className="scroll-btn scroll-btn-left"
                    onClick={() => scrollRow(genre, 'left')}
                  >
                    ‹
                  </button>
                  <div
                    id={`scroll-${genre}`}
                    className="horizontal-scroll-container"
                  >
                    {showsForGenre.map((show) => (
                      <div key={show.showId} className="movie-card">
                        <MovieCard movie={show} />
                      </div>
                    ))}
                  </div>
                  <button
                    className="scroll-btn scroll-btn-right"
                    onClick={() => scrollRow(genre, 'right')}
                  >
                    ›
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TvShowsPage;
