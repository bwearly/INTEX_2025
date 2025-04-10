import React, { useEffect, useState, useRef } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';
import MovieCard from '../../components/common/MovieCard';
import GenreFilter from '../../components/common/GenreFilter';
import AuthorizeView from '../../components/auth/AuthorizeView';
import '../../components/common/HorizontalScroll.css';

const Home: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleGenreJump = (genre: string) => {
    const section = genreRefs.current[genre];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatGenre = (genre: string) =>
    genre.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await fetchMovies(200, 1, []);
        setAllMovies(res.movies);

        // Extract genres
        const genreSet = new Set<string>();
        res.movies.forEach((movie) => {
          Object.keys(movie).forEach((key) => {
            if (
              (movie as any)[key] === 1 &&
              typeof (movie as any)[key] === 'number'
            ) {
              genreSet.add(key);
            }
          });
        });

        setSelectedGenres(Array.from(genreSet));
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  return (
    <AuthorizeView>
      <div
        className="bg-dark text-white min-vh-100 overflow-visible"
        style={{ paddingTop: '80px' }}
      >
        <Navbar />
        <HeroCarousel movies={allMovies} />

        {selectedGenres.length > 0 && (
          <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
            <select
              className="form-select w-auto bg-dark text-white mb-4"
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
        )}

        <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            selectedGenres.map((genre) => {
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
                  <h3 className="mb-3 text-white">{formatGenre(genre)}</h3>
                  <div className="group relative">
                    <button
                      className="scroll-btn scroll-btn-left"
                      onClick={() => {
                        const el = document.getElementById(`scroll-${genre}`);
                        if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
                      }}
                    >
                      ‹
                    </button>
                    <div
                      id={`scroll-${genre}`}
                      className="horizontal-scroll-container"
                    >
                      {moviesForGenre.map((movie) => (
                        <div key={movie.showId} className="movie-card">
                          <MovieCard movie={movie} />
                        </div>
                      ))}
                    </div>
                    <button
                      className="scroll-btn scroll-btn-right"
                      onClick={() => {
                        const el = document.getElementById(`scroll-${genre}`);
                        if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
                      }}
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
    </AuthorizeView>
  );
};

export default Home;
