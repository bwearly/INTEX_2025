import React from 'react';
import HeroCarousel from '../../components/common/HeroCarousel';
import MovieRow from '../../components/common/MovieRow';

const mockMovies = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Movie ${i + 1}`,
  poster: '/posters/sample.jpg', // replace with actual images
}));

const Home = () => {
  return (
    <div className="bg-dark text-light">
      <HeroCarousel />

      <div className="container-fluid px-5">
        <MovieRow title="My List" movies={mockMovies} />
        <MovieRow title="Action" movies={mockMovies} />
        <MovieRow title="Adventure" movies={mockMovies} />
        <MovieRow title="Comedy" movies={mockMovies} />
        <MovieRow title="Horror" movies={mockMovies} />
        <MovieRow title="Sci-Fi" movies={mockMovies} />
      </div>
    </div>
  );
};

export default Home;
