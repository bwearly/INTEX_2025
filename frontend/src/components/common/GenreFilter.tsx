import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';

interface GenreFilterProps {
  allMovies: Movie[];
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  allMovies,
  selectedGenres,
  setSelectedGenres,
}) => {
  const [genreOptions, setGenreOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://localhost:5000/Movie/GetGenres');
        const genres = await response.json();
        setGenreOptions(genres.map((g: string) => g.toLowerCase())); // lowercase for consistency
      } catch (err) {
        console.error('Error fetching genres', err);
      }
    };

    fetchGenres();
  }, []);

  const handleCheckboxChange = (genre: string) => {
    setSelectedGenres((prev: string[]) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const formatGenreLabel = (genre: string) =>
    genre
      .replace(/([A-Z])/g, ' $1') // space before capitals
      .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter

  return (
    <div>
      <h4 className="text-white mb-2">Filter by Genre</h4>
      <div className="flex flex-col space-y-2">
        {genreOptions.map((genre) => (
          <label key={genre} className="text-white text-sm">
            <input
              type="checkbox"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={() => handleCheckboxChange(genre)}
              className="mr-2"
            />
            {formatGenreLabel(genre)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
