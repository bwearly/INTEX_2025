import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import Navbar from '../../components/common/Navbar';
import HeroCarousel from '../../components/common/HeroCarousel';
import MoviesList from '../../components/common/MoviesList';
import GenreFilter from '../../components/common/GenreFilter';
import AuthorizeView from '../../components/auth/AuthorizeView';
import '../../components/common/HorizontalScroll.css';

const Home: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const res = await fetchMovies(200, 1, []);
        setAllMovies(res.movies);
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

        <div className="w-full max-w-screen-2xl mx-auto mt-4 px-4">
          <h2 className="text-white mb-4">All Movie Titles</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Genre Filter Column */}
            <div className="w-full lg:w-1/4">
              <GenreFilter
                allMovies={allMovies}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
              />
            </div>

            {/* Movie List Column */}
            <div className="w-full lg:w-3/4">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <MoviesList
                  allMovies={allMovies}
                  selectedGenres={selectedGenres}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthorizeView>
  );
};

export default Home;
