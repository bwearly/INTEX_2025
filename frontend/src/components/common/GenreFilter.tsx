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

// --- Helper function for text truncation ---
const truncateText = (
  text: string | null | undefined,
  maxLength: number
): string => {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trimEnd() + '...';
};

// --- Genre Formatting (Keep your existing functions) ---
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

const formatGenreLabel = (genre: string): string => {
  if (!genre || typeof genre !== 'string' || genre.trim() === '') {
    return 'Unknown Genre';
  }
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
      if (remaining.length > 0) {
        words.push(remaining.charAt(0).toUpperCase() + remaining.slice(1));
      }

      break;
    }
  }
  if (words.length === 0) {
    return genre.charAt(0).toUpperCase() + genre.slice(1);
  }
  return words.join(' • ');
};
// --- End Genre Formatting ---

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
    // --- Fetch Genres ---
    const fetchGenres = async () => {
      try {
        // --- Make Fetch Request ---

        const res = await fetch(
          'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/Movie/GetGenres',
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!res.ok) {
          if (res.status === 401) {
            console.error(
              "Received 401 Unauthorized even with credentials: 'include'. The API likely requires an Authorization header or cookie/CORS setup is preventing cookie sending."
            );
          }
          throw new Error(
            `HTTP error! status: ${res.status} ${res.statusText}`
          );
        }

        const genresData = await res.json();

        if (Array.isArray(genresData)) {
          const processedGenres = genresData
            .map((g: unknown) => String(g || '').toLowerCase())
            .filter((g) => g !== '');
          processedGenres.sort((a, b) => a.localeCompare(b));
          setGenreOptions(processedGenres);
        } else {
          console.error('Genre data received is not an array:', genresData);
          setGenreOptions([]);
        }
      } catch (err) {
        console.error('Failed to load genres (fetch error/catch block):', err);
        setGenreOptions([]);
      }
    };
    fetchGenres();

    // --- Extract Directors (Keep existing logic) ---
    const uniqueDirectors = Array.from(
      new Set(allMovies.map((m) => m.director).filter(Boolean))
    );
    setDirectors(['No Director', ...uniqueDirectors.sort()]);

    // --- Click Outside Handler ---
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

  // --- JSX Rendering ---
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
          {/* Title Filter */}
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

          {/* Genres Filter */}
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
              {genreOptions.length === 0 && (
                <option disabled>Loading genres...</option>
              )}
              {genreOptions.map((genreValue) => {
                let displayLabel = 'Error';
                try {
                  displayLabel = formatGenreLabel(genreValue);
                } catch (e) {
                  console.error(`Error formatting genre "${genreValue}":`, e);
                }
                return (
                  <option key={genreValue} value={genreValue}>
                    {displayLabel}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Director Filter */}
          <div className="mb-3">
            <label htmlFor="director-filter" className="form-label text-white">
              Director
            </label>
            <select
              id="director-filter"
              name="director-filter"
              className="form-select director-select"
              value={truncateText(filters.director, TRUNCATE_LENGTH)}
              onChange={(e) => {
                const selectedDisplayValue = e.target.value;
                let actualDirector: string | null = null;
                if (selectedDisplayValue === '') {
                  actualDirector = null;
                } else if (selectedDisplayValue === 'No Director') {
                  actualDirector = 'No Director';
                } else {
                  actualDirector =
                    directors.find(
                      (d) =>
                        truncateText(d, TRUNCATE_LENGTH) ===
                        selectedDisplayValue
                    ) || null;
                  if (!actualDirector && selectedDisplayValue) {
                    console.warn(
                      'Could not map truncated director back:',
                      selectedDisplayValue
                    );
                    actualDirector = null;
                  }
                }
                setFilters((prev) => ({ ...prev, director: actualDirector }));
              }}
              title={filters.director || 'All Directors'}
            >
              <option value="">All</option>
              {directors.map((d, i) => {
                const displayDirector = truncateText(d, TRUNCATE_LENGTH);
                return (
                  <option key={`${d}-${i}`} value={displayDirector} title={d}>
                    {displayDirector}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Type Filter */}
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

          {/* Year Filter */}
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
                  year: e.target.value ? e.target.value : null,
                }))
              }
            />
          </div>

          {/* Rating Filter */}
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
