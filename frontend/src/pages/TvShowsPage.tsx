import { useEffect, useRef, useState } from 'react';
import { fetchTvShows } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import MovieCard from '../components/common/MovieCard';
import '../components/common/HorizontalScroll.css';

const TvShowsPage = () => {
  const [tvShows, setTvShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<string[]>([]);

  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    genre.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const handleGenreJump = (genre: string) => {
    const section = genreRefs.current[genre];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const loadShows = async () => {
      try {
        const res = await fetchTvShows(200, 1);
        setTvShows(res.movies);

        const genreSet = new Set<string>();
        res.movies.forEach((show) => {
          Object.keys(show).forEach((key) => {
            if (
              (show as any)[key] === 1 &&
              typeof (show as any)[key] === 'number'
            ) {
              genreSet.add(key);
            }
          });
        });

        const sortedGenres = Array.from(genreSet).sort((a, b) =>
          formatGenre(a).localeCompare(formatGenre(b))
        );
        setGenres(sortedGenres);
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-5 fw-bold">TV Shows</h1>
          <select
            className="form-select w-auto bg-dark text-white"
            onChange={(e) => handleGenreJump(e.target.value)}
            defaultValue=""
          >
            <option disabled value="">
              Jump to Genre
            </option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {formatGenre(g)}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading TV shows...</p>
        ) : (
          genres.map((genre) => {
            const showsForGenre = tvShows.filter(
              (show) => (show as any)[genre] === 1
            );
            if (showsForGenre.length === 0) return null;

            return (
              <div
                key={genre}
                ref={(el: HTMLDivElement | null) => {
                  genreRefs.current[genre] = el;
                }} // Correctly assigning ref
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
