import { useState } from 'react';
import { Movie } from '../../../types/Movie';
import { addMovie } from '../../../api/MoviesAPI';
import './MovieForm.css';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// All genre keys for dynamic multi-select handling
const genreOptions = [
  'action',
  'adventure',
  'animeSeriesInternationalTvShows',
  'britishTvShowsDocuseriesInternationalTvShows',
  'children',
  'comedies',
  'comediesDramasInternationalMovies',
  'comediesInternationalMovies',
  'comediesRomanticMovies',
  'crimeTvShowsDocuseries',
  'documentaries',
  'documentariesInternationalMovies',
  'docuseries',
  'dramas',
  'dramasInternationalMovies',
  'dramasRomanticMovies',
  'familyMovies',
  'fantasy',
  'horrorMovies',
  'internationalMoviesThrillers',
  'internationalTvShowsRomanticTvShowsTvDramas',
  'kidsTv',
  'languageTvShows',
  'musicals',
  'natureTv',
  'realityTv',
  'spirituality',
  'tvAction',
  'tvComedies',
  'tvDramas',
  'talkShowsTvComedies',
  'thrillers',
];

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  // Form state with default values
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: '',
    posterUrl: '',
    type: '',
    director: '',
    cast: '',
    country: '',
    rating: '',
    duration: '',
    description: '',
    releaseYear: new Date().getFullYear(),
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Handle input field updates
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Handle multi-select genre changes
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selected);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert selected genres into 1/0 boolean fields
    const genrePayload = genreOptions.reduce((acc, genre) => {
      acc[genre] = selectedGenres.includes(genre) ? 1 : 0;
      return acc;
    }, {} as any);

    try {
      await addMovie({ ...formData, ...genrePayload } as Movie);
      onSuccess();
    } catch (err) {
      console.error('Error adding movie:', err);
      alert('Failed to add movie. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="movie-form">
        <button type="button" onClick={onCancel} className="btn-close">
          &times;
        </button>

        <h2>Add New Movie</h2>

        <div className="form-grid">
          {/* Basic info inputs */}
          <input
            name="title"
            placeholder="Title"
            value={formData.title || ''}
            onChange={handleChange}
          />
          <input
            name="posterUrl"
            placeholder="Poster URL"
            value={formData.posterUrl || ''}
            onChange={handleChange}
          />
          <input
            name="type"
            placeholder="Type"
            value={formData.type || ''}
            onChange={handleChange}
          />
          <input
            name="director"
            placeholder="Director"
            value={formData.director || ''}
            onChange={handleChange}
          />
          <input
            name="cast"
            placeholder="Cast"
            value={formData.cast || ''}
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Country"
            value={formData.country || ''}
            onChange={handleChange}
          />
          <input
            name="rating"
            placeholder="Rating"
            value={formData.rating || ''}
            onChange={handleChange}
          />
          <input
            name="duration"
            placeholder="Duration"
            value={formData.duration || ''}
            onChange={handleChange}
          />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            value={formData.releaseYear || ''}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description || ''}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* Genre multi-select */}
        <label className="font-semibold mt-4">Genres:</label>
        <select
          multiple
          value={selectedGenres}
          onChange={handleGenreChange}
          className="genre-select"
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (char) => char.toUpperCase())}
            </option>
          ))}
        </select>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            Add Movie
          </button>
          <button type="button" onClick={onCancel} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMovieForm;
