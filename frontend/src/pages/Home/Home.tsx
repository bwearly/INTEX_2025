import React, { useEffect, useRef, useState } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';
import MovieCard from '../../components/common/MovieCard';
import AuthorizeView from '../../components/auth/AuthorizeView';
import '../../components/common/HorizontalScroll.css';

const Home: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const formatGenre = (genre: string) =>
    genre.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const handleGenreJump = (genre: string) => {
    const section = genreRefs.current[genre];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await fetchMovies(200, 1, []);
        setAllMovies(res.movies);

        const genreSet = new Set<string>();
        res.movies.forEach((movie) => {
          Object.keys(movie).forEach((key) => {
            if ((movie as any)[key] === 1 && typeof (movie as any)[key] === 'number') {
              genreSet.add(key);
            }
          });
        });

        // Sort genres alphabetically
        const sortedGenres = Array.from(genreSet).sort((a, b) =>
          formatGenre(a).localeCompare(formatGenre(b))
        );
        setSelectedGenres(sortedGenres);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const scrollRow = (genre: string, direction: 'left' | 'right') => {
    const section = document.getElementById(`scroll-${genre}`);
    if (section) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      section.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <AuthorizeView>
      <div className="bg-dark text-white min-vh-100" style={{ paddingTop: '80px' }}>
        <Navbar />
        <HeroCarousel movies={allMovies} />

        <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
          {/* Header & Jump to Genre Dropdown */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <select
              className="form-select w-auto bg-dark text-white"
              onChange={(e) => handleGenreJump(e.target.value)}
              defaultValue=""
            >
              <option disabled value="">
                Jump to Genre
              </option>
              {selectedGenres.map((g) => (
                <option key={g} value={g}>
                  {formatGenre(g)}
                </option>
              ))}
            </select>
          </div>

          {/* Genre Rows */}
          {selectedGenres.map((genre) => {
            const moviesForGenre = allMovies.filter(
              (movie) => (movie as any)[genre] === 1
            );
            if (moviesForGenre.length === 0) return null;

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
                  <div id={`scroll-${genre}`} className="horizontal-scroll-container">
                    {moviesForGenre.map((movie) => (
                      <div key={movie.showId} className="movie-card">
                        <MovieCard movie={movie} />
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
          })}
        </div>
      </div>
    </AuthorizeView>
  );
};

export default Home;

