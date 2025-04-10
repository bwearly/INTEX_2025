import React, { useEffect, useRef, useState } from 'react';
import { Movie } from '../../types/Movie'; // Adjust path as needed
import './GenreFilter.css'; // Ensure CSS file is correctly linked

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
  if (!text) return ''; // Handle null or undefined input
  if (text.length <= maxLength) {
    return text;
  }
  // Trim potentially trailing space before adding ellipsis
  return text.substring(0, maxLength).trimEnd() + '...';
};
// --- End Helper function ---

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
      // If no word matches at the start, return the original formatted genre
      // or break if some words were already found (avoids infinite loop on weird input)
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
  // Store the *full* director names here
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
  const TRUNCATE_LENGTH = 35; // Define truncation length here

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Make sure this endpoint is correct and accessible
        const res = await fetch('https://localhost:5000/Movie/GetGenres');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const genres = await res.json();
        // Ensure genres is an array of strings before mapping
        if (Array.isArray(genres)) {
          setGenreOptions(genres.map((g: unknown) => String(g).toLowerCase()));
        } else {
          console.error('Failed to load genres: API did not return an array.');
          setGenreOptions([]);
        }
      } catch (err) {
        console.error('Failed to load genres:', err);
        setGenreOptions([]); // Set empty on error
      }
    };
    fetchGenres();

    // Extract unique, non-empty director names
    const uniqueDirectors = Array.from(
      new Set(allMovies.map((m) => m.director).filter(Boolean)) // filter(Boolean) removes null/undefined/empty strings
    );
    // Add "No Director" option if desired, store full names
    setDirectors(['No Director', ...uniqueDirectors]);

    // Click outside handler
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
  }, [allMovies]); // Dependency array

  return (
    <div className="position-relative genre-dropdown" ref={dropdownRef}>
      <button
        className="btn btn-outline-light dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        // Add aria attributes for accessibility
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
              {genreOptions.map((genre) => (
                <option key={genre} value={genre}>
                  {formatGenreLabel(genre)}
                </option>
              ))}
            </select>
          </div>

          {/* Director Filter - WITH TRUNCATION */}
          <div className="mb-3">
            <label htmlFor="director-filter" className="form-label text-white">
              Director
            </label>
            <select
              id="director-filter"
              name="director-filter" // Name attribute can be useful
              className="form-select director-select" // Use specific class if needed for CSS
              // The value shown in the closed select box should be the truncated one
              value={truncateText(filters.director, TRUNCATE_LENGTH)}
              onChange={(e) => {
                const selectedValue = e.target.value; // This is the truncated value
                let actualDirector: string | null = null;

                if (selectedValue === '') {
                  actualDirector = null; // "All" selected
                } else if (selectedValue === 'No Director') {
                  // Decide if "No Director" should be null or a specific string in state
                  actualDirector = null; // Example: Treat "No Director" as null filter
                } else {
                  // Find the original director name based on the truncated value
                  actualDirector =
                    directors.find(
                      (d) => truncateText(d, TRUNCATE_LENGTH) === selectedValue
                    ) || null;
                  // Basic fallback if somehow not found (might happen if directors list changes)
                  if (!actualDirector) {
                    console.warn(
                      'Could not map truncated director back to original:',
                      selectedValue
                    );
                    // Decide fallback behavior: use selectedValue? set to null?
                    actualDirector = null;
                  }
                }

                setFilters((prev) => ({
                  ...prev,
                  // Store the *full* director name (or null) in filters state
                  director: actualDirector,
                }));
              }}
              // Add title attribute to show full selected name on hover
              title={filters.director || 'All Directors'}
            >
              <option value="">All</option>
              {/* Map over the full director names */}
              {directors.map((d, i) => {
                // Get the truncated version for display and value
                const displayDirector = truncateText(d, TRUNCATE_LENGTH);
                return (
                  <option
                    key={`${d}-${i}`} // Use a more unique key if names aren't unique
                    // The value of the option *must* match what you check in onChange
                    value={displayDirector}
                    // Show the full name on hover
                    title={d}
                  >
                    {/* Display the truncated name */}
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
                </option> // Added value attribute
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
              placeholder="e.g. 2023" // Add placeholder
              value={filters.year || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  // Ensure empty input becomes null, otherwise use the string value
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
                </option> // Added value attribute
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
