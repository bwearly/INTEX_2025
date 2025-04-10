import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../../types/Movie';
import './GenreFilter.css';

interface FilterDropdownProps {
  allMovies: Movie[];
  filters: {
    genres: string[];
    director: string | null;
    type: string | null;
    year: string | null;
    rating: string | null;
    title: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<FilterDropdownProps['filters']>
  >;
}

const genreAliases: Record<string, string> = {
  animeseriesinternationaltvshows: 'Anime Series (Intl)',
  britishtvshowsdocuseriesinternationaltvshows: 'British TV Docuseries (Intl)',
  comediesdramasinternationalmovies: 'Comedies & Dramas (Intl)',
  internationaltvshowsromantictvshowstvdramas: 'Intl Romantic TV Dramas',
  horrormovies: 'Horror Movies',
  dramasinternationalmovies: 'International Dramas',
  dramasromanticmovies: 'Romantic Dramas',
  familymovies: 'Family Movies',
  languagetvshows: 'Foreign Language TV',
  crimetvshowsdocuseries: 'Crime Docuseries',
  comediesromanticmovies: 'Romantic Comedies',
  documentariesseries: 'Documentary Series',
  comediesinternationalmovies: 'International Comedies',
  documentariesinternationalmovies: 'International Documentaries',
  talkshowstvcomedies: 'Talk Show TV Comedies',
};

const formatGenreLabel = (genre: string) => {
  const key = genre.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const aliasMatch = Object.keys(genreAliases).find(
    (alias) => alias.toLowerCase() === key
  );
  if (aliasMatch) return genreAliases[aliasMatch];

  const wordBank = [
    'anime',
    'series',
    'international',
    'tv',
    'shows',
    'movies',
    'docs',
    'documentaries',
    'docuseries',
    'dramas',
    'comedies',
    'romantic',
    'thrillers',
    'crime',
    'kids',
    'language',
    'musicals',
    'nature',
    'family',
    'action',
    'adventure',
    'fantasy',
    'talk',
  ];

  let remaining = key;
  const words: string[] = [];

  while (remaining.length > 0) {
    let match = '';
    for (const word of wordBank) {
      if (remaining.startsWith(word) && word.length > match.length) {
        match = word;
      }
    }

    if (match) {
      words.push(match.charAt(0).toUpperCase() + match.slice(1));
      remaining = remaining.slice(match.length);
    } else {
      if (words.length === 0) {
        return genre.charAt(0).toUpperCase() + genre.slice(1);
      }
      break;
    }
  }

  return words.join(' • ');
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  allMovies,
  filters,
  setFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [genreOptions, setGenreOptions] = useState<string[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);
  const types = ['Movie', 'TV Show'];
  const ratings = [
    'G',
    'PG',
    'PG-13',
    'TV-Y',
    'TV-Y7',
    'TV-PG',
    'TV-14',
    'TV-MA',
    'R',
  ];

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('https://localhost:5000/Movie/GetGenres');
        const genres = await res.json();
        setGenreOptions(genres.map((g: string) => g.toLowerCase()));
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };
    fetchGenres();

    const uniqueDirectors = Array.from(
      new Set(allMovies.map((m) => m.director).filter(Boolean))
    );
    setDirectors(['No Director', ...uniqueDirectors]);

    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, [allMovies]);

  return (
    <div className="position-relative genre-dropdown" ref={dropdownRef}>
      <button
        className="btn btn-outline-light dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter
      </button>

      {isOpen && (
        <div className="genre-dropdown-menu show p-3">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label text-white">Title</label>
            <input
              className="form-control"
              type="text"
              value={filters.title}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Genre */}
          <div className="mb-3">
            <label className="form-label text-white">Genres</label>
            <select
              className="form-select"
              value={filters.genres[0] || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  genres: e.target.value ? [e.target.value] : [],
                }))
              }
            >
              <option value="">All</option>
              {genreOptions.map((genre) => (
                <option key={genre} value={genre}>
                  {formatGenreLabel(genre)}
                </option>
              ))}
            </select>
          </div>
          {/* Director */}
          <div className="mb-3">
            <label className="form-label text-white">Director</label>
            <select
              className="form-select dropdown-select"
              value={filters.director || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  director:
                    e.target.value === '' || e.target.value === 'No Director'
                      ? null
                      : e.target.value,
                }))
              }
            >
              <option value="">All</option>
              <option value="No Director">No Director</option>
              {directors
                .filter((d) => d && d !== 'No Director') // optional: remove duplicates
                .map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
            </select>
          </div>

          {/* Type */}
          <div className="mb-3">
            <label className="form-label text-white">Type</label>
            <select
              className="form-select"
              value={filters.type || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  type: e.target.value || null,
                }))
              }
            >
              <option value="">All</option>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="mb-3">
            <label className="form-label text-white">Year</label>
            <input
              className="form-control"
              type="number"
              value={filters.year || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  year: e.target.value || null,
                }))
              }
            />
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label className="form-label text-white">Rating</label>
            <select
              className="form-select"
              value={filters.rating || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  rating: e.target.value || null,
                }))
              }
            >
              <option value="">All</option>
              {ratings.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
