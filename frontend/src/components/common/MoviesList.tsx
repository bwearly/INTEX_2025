// src/components/common/MovieList.tsx
import React from 'react';
import { Movie } from '../../types/Movie';
import MovieRow from './MovieRow';

interface MoviesListProps {
  allMovies: Movie[];
  selectedGenres: string[];
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

// Display name overrides (optional)
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
    .filter((key) => {
      const value = (movie as any)[key];
      return typeof value === 'number' && value === 1;
    })
    .map((key) => normalizeKey(key));
};

const MoviesList: React.FC<MoviesListProps> = ({
  allMovies,
  selectedGenres,
  onClick,
  onDelete,
}) => {
  const groupedMovies: Record<string, Movie[]> = {};

  allMovies.forEach((movie) => {
    const rawGenres = extractGenres(movie);

    const genresToUse =
      selectedGenres.length > 0
        ? rawGenres.filter((g) => selectedGenres.includes(g))
        : rawGenres;

    if (genresToUse.length === 0) {
      genresToUse.push('uncategorized');
    }

    genresToUse.forEach((genre) => {
      if (!groupedMovies[genre]) groupedMovies[genre] = [];
      groupedMovies[genre].push(movie);
    });
  });

  const sortedGenres = Object.keys(groupedMovies).sort();

  return (
    <div className="px-4">
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
