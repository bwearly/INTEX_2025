// src/components/common/MoviesList.tsx
import React from 'react';
import { Movie } from '../../types/Movie';
import MovieRow from './MovieRow';

interface MoviesListProps {
  allMovies: Movie[];
  selectedGenres: string[];
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const genreDisplayMap: Record<string, string> = {
  action: 'Action',
  adventure: 'Adventure',
  dramas: 'Dramas',
  documentaries: 'Documentaries',
  fantasy: 'Fantasy',
  horrorMovies: 'Horror Movies',
  tvComedies: 'TV Comedies',
  tvDramas: 'TV Dramas',
  comedies: 'Comedies',
  thrillers: 'Thrillers',
};

const normalizeKey = (key: string) =>
  key
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase();

const extractGenres = (movie: Movie): string[] => {
  return Object.keys(movie)
    .filter(
      (key) =>
        typeof (movie as any)[key] === 'number' && (movie as any)[key] === 1
    )
    .map((key) => normalizeKey(key));
};

// Dummy movies
const dummyMovie = (id: string, title: string): Movie => ({
  showId: id,
  title,
  releaseYear: 2023,
  posterUrl: '/images.png',
  action: 1,
  adventure: 0,
  comedies: 0,
  dramas: 0,
  type: '',
  director: '',
  cast: '',
  country: '',
  rating: '',
  duration: '',
  description: '',
  animeSeriesInternationalTvShows: 0,
  britishTvShowsDocuseriesInternationalTvShows: 0,
  children: 0,
  comediesDramasInternationalMovies: 0,
  comediesInternationalMovies: 0,
  comediesRomanticMovies: 0,
  crimeTvShowsDocuseries: 0,
  documentaries: 0,
  documentariesInternationalMovies: 0,
  docuseries: 0,
  dramasInternationalMovies: 0,
  dramasRomanticMovies: 0,
  familyMovies: 0,
  fantasy: 0,
  horrorMovies: 0,
  internationalMoviesThrillers: 0,
  internationalTvShowsRomanticTvShowsTvDramas: 0,
  kidsTv: 0,
  languageTvShows: 0,
  musicals: 0,
  natureTv: 0,
  realityTv: 0,
  spirituality: 0,
  tvAction: 0,
  tvComedies: 0,
  tvDramas: 0,
  talkShowsTvComedies: 0,
  thrillers: 0,
});

const myList: Movie[] = [
  dummyMovie('my1', 'My Movie 1'),
  dummyMovie('my2', 'My Movie 2'),
  dummyMovie('my3', 'My Movie 3'),
];

const recommended: Movie[] = [
  dummyMovie('rec1', 'Recommended 1'),
  dummyMovie('rec2', 'Recommended 2'),
  dummyMovie('rec3', 'Recommended 3'),
];

const MoviesList: React.FC<MoviesListProps> = ({
  allMovies,
  selectedGenres,
  onClick,
  onDelete,
}) => {
  const groupedMovies: Record<string, Movie[]> = {};

  allMovies.forEach((movie) => {
    const genres = extractGenres(movie);
    const activeGenres =
      selectedGenres.length > 0
        ? genres.filter((g) => selectedGenres.includes(g))
        : genres;

    if (activeGenres.length === 0) {
      activeGenres.push('uncategorized');
    }

    activeGenres.forEach((genre) => {
      if (!groupedMovies[genre]) groupedMovies[genre] = [];
      groupedMovies[genre].push(movie);
    });
  });

  const sortedGenres = Object.keys(groupedMovies).sort();

  return (
    <div className="px-4 space-y-8">
      {/* Top Rows */}
      <MovieRow
        title="My List"
        movies={myList}
        onClick={onClick}
        onDelete={onDelete}
      />
      <MovieRow
        title="Recommended"
        movies={recommended}
        onClick={onClick}
        onDelete={onDelete}
      />

      {/* Genre Rows */}
      {sortedGenres.map((genre) => (
        <MovieRow
          key={genre}
          title={
            genreDisplayMap[genre] ||
            genre.charAt(0).toUpperCase() + genre.slice(1)
          }
          movies={groupedMovies[genre]}
          onClick={onClick}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MoviesList;
