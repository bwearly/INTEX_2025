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
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        numericFields.includes(name) || type === 'number'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.showId || formData.showId.trim() === '') {
      alert('ShowId is required.');
      return;
    }

    try {
      await updateMovie(formData.showId, formData);
      onSuccess();
    } catch (err) {
      console.error('Error updating movie:', err);
      alert('Failed to update movie. Please try again.');
    }
  };

  const renderTextField = (name: keyof Movie, label: string) => (
    <label className="block mb-2">
      {label}:
      <input
        className="block w-full border p-1 rounded"
        name={name}
        value={formData[name] || ''}
        onChange={handleChange}
      />
    </label>
  );

  const renderNumberField = (name: keyof Movie, label: string) => (
    <label className="block mb-2">
      {label}:
      <input
        type="number"
        className="block w-full border p-1 rounded"
        name={name}
        value={formData[name] || 0}
        onChange={handleChange}
      />
    </label>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow text-black w-full max-w-3xl"
    >
      <h2 className="text-xl font-bold mb-4">Edit Movie</h2>

      <div className="grid grid-cols-2 gap-4">
        {renderTextField('title', 'Title')}
        {renderTextField('posterUrl', 'Poster URL')}
        {renderTextField('type', 'Type')}
        {renderTextField('director', 'Director')}
        {renderTextField('cast', 'Cast')}
        {renderTextField('country', 'Country')}
        {renderTextField('rating', 'Rating')}
        {renderTextField('duration', 'Duration')}
        {renderNumberField('releaseYear', 'Release Year')}

        <label className="col-span-2">
          Description:
          <textarea
            name="description"
            className="block w-full border p-1 rounded"
            value={formData.description || ''}
            onChange={handleChange}
          />
        </label>
      </div>

      <h3 className="font-semibold mt-6">Genres (0 or 1):</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {numericFields.map((genreKey) =>
          renderNumberField(
            genreKey as keyof Movie,
            genreKey.replace(/([A-Z])/g, ' $1')
          )
        )}
      </div>

      <div className="mt-6 flex gap-4">
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
