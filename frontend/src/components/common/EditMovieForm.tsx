import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { updateMovie } from '../../api/MoviesAPI';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    ...movie,
    showId: movie.showId || '',
    title: movie.title || '',
    type: movie.type || '',
    director: movie.director || '',
    cast: movie.cast || '',
    country: movie.country || '',
    rating: movie.rating || '',
    duration: movie.duration || '',
    description: movie.description || '',
    releaseYear: movie.releaseYear || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = [
      'releaseYear',
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

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.showId) {
      alert('ShowId is required.');
      return;
    }

    try {
      await updateMovie(formData.showId, formData); // keep it string!
      onSuccess();
    } catch (err) {
      console.error('Error updating movie:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow text-black w-full max-w-md"
    >
      <h2 className="text-xl font-bold mb-4">Edit Movie</h2>
      <div className="form-grid">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </label>

        <label>
          Director:
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
          />
        </label>

        <label>
          Cast:
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
          />
        </label>

        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>

        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>

        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </label>

        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        {/* Example genre input */}
        <label>
          Action:
          <input
            type="number"
            name="action"
            value={formData.action}
            onChange={handleChange}
          />
        </label>

        {/* Add more genre inputs as needed using the same format */}

        <div className="mt-4 flex gap-2">
          <button type="submit" className="btn btn-primary">
            Update Movie
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditMovieForm;
