import React from 'react';
import HeroCarousel from '../../components/common/HeroCarousel';
import MovieRow from '../../components/common/MovieRow';

const sampleMovies = [
  { id: 1, title: 'Sample Movie', posterUrl: '/posters/sample.jpg' },
  { id: 2, title: 'Another Flick', posterUrl: '/posters/another.jpg' }
];

const Home: React.FC = () => {
  return (
    <div className="bg-dark text-white min-vh-100">
      <HeroCarousel />
      <MovieRow title="My List" movies={sampleMovies} />
      <MovieRow title="Action" movies={sampleMovies} />
      <MovieRow title="Adventure" movies={sampleMovies} />
      <MovieRow title="Comedy" movies={sampleMovies} />
    </div>
  );
};

export default Home;
