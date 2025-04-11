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

// Truncate long display strings
const truncateText = (
  text: string | null | undefined,
  maxLength: number
): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '...';
};

// Custom display labels for some genre keys
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
};

// Format genre strings into readable labels
const formatGenreLabel = (genre: string): string => {
  const key = genre.replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (!key) return 'Unknown Genre';

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
    'british',
    'reality',
    'spirituality',
  ];

  let remaining = key;
  const words: string[] = [];

  while (remaining.length > 0) {
    let match = '';
    wordBank.sort((a, b) => b.length - a.length);
    for (const word of wordBank) {
      if (remaining.startsWith(word)) {
        match = word;
        break;
      }
    }
    if (match) {
      words.push(match.charAt(0).toUpperCase() + match.slice(1));
      remaining = remaining.slice(match.length);
    } else {
      words.push(remaining.charAt(0).toUpperCase() + remaining.slice(1));
      break;
    }
  }

  return words.length > 0 ? words.join(' • ') : genre;
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
  const TRUNCATE_LENGTH = 35;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/Movie/GetGenres',
          { method: 'GET', credentials: 'include' }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const genresData = await res.json();

        if (Array.isArray(genresData)) {
          const processed = genresData
            .map((g: unknown) => String(g || '').toLowerCase())
            .filter((g) => g !== '')
            .sort((a, b) => a.localeCompare(b));
          setGenreOptions(processed);
        } else {
          console.error('Genre data is not an array:', genresData);
        }
      } catch (err) {
        console.error('Genre fetch error:', err);
      }
    };

    fetchGenres();

    const uniqueDirectors = Array.from(
      new Set(allMovies.map((m) => m.director).filter(Boolean))
    );
    setDirectors(['No Director', ...uniqueDirectors.sort()]);

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
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Filter
      </button>

      {isOpen && (
        <div className="genre-dropdown-menu show p-3">
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title-filter" className="form-label text-white">
              Title
            </label>
            <input
              id="title-filter"
              className="form-control"
              type="text"
              value={filters.title}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Genres */}
          <div className="mb-3">
            <label htmlFor="genre-filter" className="form-label text-white">
              Genres
            </label>
            <select
              id="genre-filter"
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
            <label htmlFor="director-filter" className="form-label text-white">
              Director
            </label>
            <select
              id="director-filter"
              className="form-select"
              value={truncateText(filters.director, TRUNCATE_LENGTH)}
              onChange={(e) => {
                const selected = e.target.value;
                const actual =
                  selected === 'No Director'
                    ? 'No Director'
                    : directors.find(
                        (d) => truncateText(d, TRUNCATE_LENGTH) === selected
                      ) || null;
                setFilters((prev) => ({ ...prev, director: actual }));
              }}
              title={filters.director || 'All Directors'}
            >
              <option value="">All</option>
              {directors.map((d, i) => (
                <option
                  key={`${d}-${i}`}
                  value={truncateText(d, TRUNCATE_LENGTH)}
                >
                  {truncateText(d, TRUNCATE_LENGTH)}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="mb-3">
            <label htmlFor="type-filter" className="form-label text-white">
              Type
            </label>
            <select
              id="type-filter"
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
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="mb-3">
            <label htmlFor="year-filter" className="form-label text-white">
              Year
            </label>
            <input
              id="year-filter"
              className="form-control"
              type="number"
              placeholder="e.g. 2023"
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
            <label htmlFor="rating-filter" className="form-label text-white">
              Rating
            </label>
            <select
              id="rating-filter"
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
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
