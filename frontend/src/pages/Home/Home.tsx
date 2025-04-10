import React, { useEffect, useRef, useState } from 'react';
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

        // Fetch recommendations by genre
        const userShowId = 's8135'; // Replace with dynamic user showId if needed
        const genreRecs: Record<string, Movie[]> = {};

        for (const genre of genres) {
          if (recommenderMapByColumn[genre]) {
            try {
              const ids = await recommenderMapByColumn[genre](userShowId);
              const recMovies = await fetchMoviesByIds(ids);
              genreRecs[genre] = recMovies;
            } catch (err) {
              console.warn(`Could not load recommendations for ${genre}:`, err);
            }
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

  const scrollRow = (genre: string, direction: 'left' | 'right') => {
    const section = document.getElementById(`scroll-${genre}`);
    if (section) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      section.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <AuthorizeView>
      <div
        className="bg-dark text-white min-vh-100"
        style={{ paddingTop: '80px' }}
      >
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

          {/* Genre Rows with Recommendations */}
          {selectedGenres.map((genre) => {
            const recs = recommendationsByGenre[genre];
            if (!recs || recs.length === 0) return null;

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
