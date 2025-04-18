import { useState } from 'react';
import { Movie } from '../../../types/Movie';
import { updateMovie } from '../../../api/MoviesAPI';
import './MovieForm.css';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

// List of all possible genre keys used in the form
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

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  // Prepopulate form state with existing movie data
  const [formData, setFormData] = useState<Movie>({ ...movie });

  // Extract currently active genres from the movie
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    genreOptions.filter((g) => formData[g as keyof Movie] === 1)
  );

  // Handle text/number input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Handle genre selection from multi-select dropdown
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selected);
  };

  // Submit updated movie data with selected genres
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create genre fields as 0/1 booleans for payload
    const genrePayload = genreOptions.reduce((acc, genre) => {
      acc[genre] = selectedGenres.includes(genre) ? 1 : 0;
      return acc;
    }, {} as any);

    try {
      await updateMovie(formData.showId, { ...formData, ...genrePayload });
      onSuccess();
    } catch (err) {
      console.error('Error updating movie:', err);
      alert('Failed to update movie. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="movie-form">
        <button type="button" onClick={onCancel} className="btn-close">
          &times;
        </button>

        <h2>Edit Movie</h2>

        <div className="form-grid">
          {/* Basic movie info inputs */}
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            name="posterUrl"
            placeholder="Poster URL"
            value={formData.posterUrl}
            onChange={handleChange}
          />
          <input
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
          />
          <input
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
          />
          <input
            name="cast"
            placeholder="Cast"
            value={formData.cast}
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
          />
          <input
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
          />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            value={formData.releaseYear}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* Genre selector */}
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
                .replace(/([A-Z])/g, ' $1') // Format camelCase to spaced words
                .replace(/^./, (char) => char.toUpperCase())}
            </option>
          ))}
        </select>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            Update Movie
          </button>
          <button type="button" onClick={onCancel} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieForm;
