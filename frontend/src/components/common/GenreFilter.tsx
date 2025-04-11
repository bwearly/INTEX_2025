// GenreFilter.tsx - Potential Fix includes detailed logging in render map

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
  return text.substring(0, maxLength).trimEnd() + '...';
};
// --- End Helper function ---

// --- Genre Formatting ---
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
  // Add other aliases as needed
};

const formatGenreLabel = (genre: string): string => {
  // Added defensive check for empty string input
  if (!genre || typeof genre !== 'string' || genre.trim() === '') {
    console.warn(`formatGenreLabel received invalid genre input: "${genre}"`);
    return 'Unknown Genre'; // Return a specific string, not 'All'
  }

  const key = genre.replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (!key) return 'Unknown Genre'; // Handle case where genre becomes empty after replacing non-letters

  const aliasMatch = Object.keys(genreAliases).find(
    (alias) => alias.toLowerCase() === key
  );
  if (aliasMatch) return genreAliases[aliasMatch];

  // Word bank logic (keep as is unless proven problematic by logs)
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
    'spirituality' /* Added more words */,
  ];

  let remaining = key;
  const words: string[] = [];

  while (remaining.length > 0) {
    let match = '';
    // Find longest matching word first
    wordBank.sort((a, b) => b.length - a.length);
    for (const word of wordBank) {
      if (remaining.startsWith(word)) {
        match = word;
        break; // Found the longest match
      }
    }

    if (match) {
      words.push(match.charAt(0).toUpperCase() + match.slice(1));
      remaining = remaining.slice(match.length);
    } else {
      // If no word matches, append the rest (or first char) and break
      // to avoid infinite loops on unexpected input
      if (remaining.length > 0) {
        // Fallback: Capitalize the first letter of the remaining part
        words.push(remaining.charAt(0).toUpperCase() + remaining.slice(1));
      }
      console.warn(
        `formatGenreLabel word segmentation stopped unexpectedly for key: "${key}", remaining: "${remaining}"`
      );
      break;
    }
  }

  if (words.length === 0) {
    // Fallback if no words could be segmented at all
    console.warn(
      `formatGenreLabel could not segment key: "${key}", returning capitalized original.`
    );
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
        const res = await fetch(
          'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/Movie/GetGenres'
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const genresData = await res.json();
        // console.log('API Response (Genres raw):', genresData); // Optional: Keep for debugging if needed

        if (Array.isArray(genresData)) {
          const processedGenres = genresData
            .map((g: unknown) => String(g || '').toLowerCase()) // Ensure conversion handles potential null/undefined
            .filter((g) => g !== ''); // Filter out empty strings AFTER potential conversion issues

          // console.log('Processed Genres for State:', processedGenres); // Optional: Keep for debugging

          // Sort alphabetically for better UX
          processedGenres.sort((a, b) => a.localeCompare(b));

          setGenreOptions(processedGenres);
        } else {
          console.error(
            'Failed to load genres: API did not return an array.',
            genresData
          );
          setGenreOptions([]);
        }
      } catch (err) {
        console.error('Failed to load genres (fetch error):', err);
        setGenreOptions([]); // Set empty on error
      }
    };
    fetchGenres();

    // --- Extract Directors ---
    const uniqueDirectors = Array.from(
      new Set(allMovies.map((m) => m.director).filter(Boolean))
    );
    setDirectors(['No Director', ...uniqueDirectors.sort()]); // Sort directors too

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
  }, [allMovies]); // Dependency only on allMovies (for directors)

  return (
    <div className="position-relative genre-dropdown" ref={dropdownRef}>
      <button
        className="btn btn-outline-light dropdown-toggle" // Consider matching theme: btn-generic-yellow?
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Filter
      </button>

      {isOpen && (
        <div className="genre-dropdown-menu show p-3">
          {/* --- Title Filter --- */}
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

          {/* --- Genres Filter --- */}
          <div className="mb-3">
            <label htmlFor="genre-filter" className="form-label text-white">
              Genres
            </label>
            <select
              id="genre-filter"
              className="form-select"
              value={filters.genres[0] || ''} // Expecting only one selection
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  // If user selects "All" (value=""), set genres to empty array
                  // Otherwise, set genres to an array containing the selected value
                  genres: e.target.value ? [e.target.value] : [],
                }))
              }
            >
              <option value="">All</option>
              {genreOptions.length === 0 && (
                <option disabled>Loading genres...</option>
              )}
              {genreOptions.map((genreValue) => {
                // --- Diagnostic Logging ---
                console.log(`Rendering Option -> Input Value: "${genreValue}"`);
                let displayLabel = 'Formatting Error'; // Default
                try {
                  displayLabel = formatGenreLabel(genreValue); // Call formatting function
                  console.log(
                    `                 -> Output Label: "${displayLabel}"`
                  );
                } catch (e) {
                  console.error(`Error formatting genre "${genreValue}":`, e);
                }
                // Check if the generated label is problematic
                if (displayLabel.trim() === '' || displayLabel === 'All') {
                  console.warn(
                    `Label for "${genreValue}" became empty or "All"!`
                  );
                  // Fallback display if label generation fails badly
                  displayLabel =
                    genreValue.charAt(0).toUpperCase() + genreValue.slice(1); // Simple capitalize as fallback
                }
                // --- End Logging ---

                return (
                  <option key={genreValue} value={genreValue}>
                    {displayLabel} {/* Use the potentially fixed label */}
                  </option>
                );
              })}
            </select>
          </div>

          {/* --- Director Filter (Keep existing logic) --- */}
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
                  actualDirector = 'No Director'; // Store specific string if needed for filtering
                } else {
                  actualDirector =
                    directors.find(
                      (d) =>
                        truncateText(d, TRUNCATE_LENGTH) ===
                        selectedDisplayValue
                    ) || null;
                  if (!actualDirector && selectedDisplayValue) {
                    // Handle case where find fails
                    console.warn(
                      'Could not map truncated director back:',
                      selectedDisplayValue
                    );
                    actualDirector = null; // Fallback to null filter
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

          {/* --- Type Filter --- */}
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

          {/* --- Year Filter --- */}
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

          {/* --- Rating Filter --- */}
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
        </div> // End dropdown-menu
      )}
    </div> // End wrapper div
  );
};

export default FilterDropdown;
