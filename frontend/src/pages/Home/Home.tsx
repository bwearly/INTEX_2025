import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';
import MovieCard from '../../components/common/MovieCard';
import AuthorizeView from '../../components/auth/AuthorizeView';
import '../../components/common/HorizontalScroll.css';
import {
  recommenderMapByColumn,
  fetchMoviesByIds,
} from '../../api/RecommenderAPI';

const Home: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendationsByGenre, setRecommendationsByGenre] = useState<
    Record<string, Movie[]>
  >({});
  const [loading, setLoading] = useState(true);
  const genreRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const formatGenre = (genre: string) =>
    genre.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  const normalizeGenreKey = (key: string) => {
    return key
      .replace(/Movies|TvShows?|Series/gi, '')
      .replace(/([A-Z])/g, (match) => match.toLowerCase())
      .replace(/[^a-z]/gi, '')
      .trim();
  };

  const handleGenreJump = (genre: string) => {
    const section = genreRefs.current[genre];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollRow = (genre: string, direction: 'left' | 'right') => {
    const section = document.getElementById(`scroll-${genre}`);
    if (section) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      section.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await fetchMovies(100, 1, []);
        setAllMovies(res.movies);

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

        const genres = Array.from(genreSet);
        setSelectedGenres(genres);

        const watchedRes = await fetch(
          'https://localhost:5000/api/Recommendations/GetWatchedTitles',
          { credentials: 'include' }
        );
        const watchedIds: string[] = await watchedRes.json();

        const genreRecs: Record<string, Movie[]> = {};

        for (const rawGenre of genres) {
          const normalizedKey = normalizeGenreKey(rawGenre);

          if (!recommenderMapByColumn[normalizedKey]) {
            console.warn(`⚠️ No recommender API mapped for: ${normalizedKey}`);
            continue;
          }

          let found = false;
          for (const showId of watchedIds) {
            try {
              const ids = await recommenderMapByColumn[normalizedKey](showId);
              console.log(`🎯 ${rawGenre} (from ${showId}) => Show IDs:`, ids);

              if (ids.length > 0) {
                const recMovies = await fetchMoviesByIds(ids);
                genreRecs[rawGenre] = recMovies;
                found = true;
                break;
              }
            } catch (err) {
              console.error(
                `❌ Failed to get ${rawGenre} recs for ${showId}:`,
                err
              );
            }
          }

          if (!found) {
            console.warn(
              `⚠️ Skipped ${rawGenre}: No recommendations from any watched show`
            );
          }
        }

        setRecommendationsByGenre(genreRecs);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <AuthorizeView>
      <div
        className="bg-dark text-white min-vh-100"
        style={{ paddingTop: '80px' }}
      >
        <Navbar />
        <HeroCarousel movies={allMovies} />

        <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
          {/* Genre Dropdown */}
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

          {/* Genres WITH recommendations */}
          {selectedGenres
            .filter((g) => recommendationsByGenre[g]?.length > 0)
            .map((genre) => {
              const recs = recommendationsByGenre[genre];
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
                      {recs.map((movie) => (
                        <div key={movie.showId} className="movie-card">
                          <Link to={`/Movie/${movie.showId}`}>
                            <MovieCard movie={movie} />
                          </Link>
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

          {/* Genres WITHOUT recommendations - fallback to real movies */}
          {selectedGenres
            .filter((g) => !recommendationsByGenre[g]?.length)
            .map((genre) => {
              const fallbackMovies = allMovies.filter(
                (m) =>
                  (m as any)[genre] === 1 &&
                  typeof (m as any)[genre] === 'number'
              );

              return (
                <div
                  key={genre}
                  ref={(el) => (genreRefs.current[genre] = el)}
                  className="movie-row-container mb-5"
                  style={{ scrollMarginTop: '120px' }}
                >
                  <h3 className="mb-3">{formatGenre(genre)}</h3>
                  <div className="horizontal-scroll-container">
                    {fallbackMovies.map((movie) => (
                      <div key={movie.showId} className="movie-card">
                        <Link to={`/Movie/${movie.showId}`}>
                          <MovieCard movie={movie} />
                        </Link>
                      </div>
                    ))}
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
