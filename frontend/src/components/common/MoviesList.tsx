import React from 'react';
import { Movie } from '../../types/Movie';
import MovieRow from './MovieRow';

interface MoviesListProps {
  allMovies: Movie[];
  selectedGenres: string[];
  formatGenre?: (genre: string) => string;
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

// Map for custom genre label overrides
const genreAliases: Record<string, string> = {
  animseriesinternationaltvshows: 'Anime Series • International TV Shows',
  britishtvshowsdocuseriesinternationaltvshows:
    'British TV Shows • Docuseries • International',
  documentariesinternationalmovies: 'Documentaries • International Movies',
  children: 'Children & Family',
};

// Default formatter for genre labels
const defaultFormatGenre = (genre: string) => {
  const key = genre.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const aliasMatch = Object.keys(genreAliases).find(
    (alias) => alias.toLowerCase() === key
  );
  if (aliasMatch) return genreAliases[aliasMatch];
  return genre
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' • ');
};

const MoviesList: React.FC<MoviesListProps> = ({
  allMovies,
  selectedGenres,
  formatGenre = defaultFormatGenre,
  onClick,
  onDelete,
}) => {
  const genreMap: Record<string, Movie[]> = {};

  // Group movies into genres based on keys with value === 1
  allMovies.forEach((movie) => {
    Object.keys(movie).forEach((key) => {
      if (
        (movie as any)[key] === 1 &&
        typeof (movie as any)[key] === 'number'
      ) {
        if (!genreMap[key]) genreMap[key] = [];
        genreMap[key].push(movie);
      }
    });
  });

  const sortedGenres = Object.keys(genreMap).sort();

  return (
    <div className="px-4 space-y-8">
      {sortedGenres.map((genre) => (
        <div key={genre} className="movie-row-container mb-5">
          {/* Render genre label and its corresponding MovieRow */}
          <h3 className="text-xl font-semibold mb-2">{formatGenre(genre)}</h3>
          <MovieRow
            title=""
            movies={genreMap[genre]}
            onClick={onClick}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
