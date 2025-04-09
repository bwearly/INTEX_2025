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
    showId: movie.showId || '', // ✅ ensure showId is preserved
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

    console.log('Submitting movie update with ID:', formData.showId);

    if (!formData.showId || formData.showId.trim() === '') {
      alert('ShowId is required.');
      return;
    }

    try {
      await updateMovie(formData.showId, formData); // ✅ showId is used here
      onSuccess(); // refresh list
    } catch (err) {
      console.error('Error updating movie:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow text-black w-full max-w-2xl"
    >
      <h2 className="text-xl font-bold mb-4">Edit Movie</h2>
      <div className="grid grid-cols-2 gap-4">
        <label>
          Title:
          <input name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Type:
          <input name="type" value={formData.type} onChange={handleChange} />
        </label>
        <label>
          Director:
          <input
            name="director"
            value={formData.director}
            onChange={handleChange}
          />
        </label>
        <label>
          Cast:
          <input name="cast" value={formData.cast} onChange={handleChange} />
        </label>
        <label>
          Country:
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
        <label>
          Rating:
          <input
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>
        <label>
          Duration:
          <input
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
        <label className="col-span-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full"
          />
        </label>
        <label>
          Action:
          <input
            type="number"
            name="action"
            value={formData.action}
            onChange={handleChange}
          />
        </label>

        {/* You can continue rendering genre fields here as needed */}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Movie
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMovieForm;
