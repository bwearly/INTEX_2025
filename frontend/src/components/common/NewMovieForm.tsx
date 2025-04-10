import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { addMovie } from '../../api/MoviesAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: '',
    type: '',
    director: '',
    cast: '',
    country: '',
    rating: '',
    duration: '',
    description: '',
    releaseYear: new Date().getFullYear(),
    posterUrl: '',
    action: 0,
    adventure: 0,
    animeSeriesInternationalTvShows: 0,
    britishTvShowsDocuseriesInternationalTvShows: 0,
    children: 0,
    comedies: 0,
    comediesDramasInternationalMovies: 0,
    comediesInternationalMovies: 0,
    comediesRomanticMovies: 0,
    crimeTvShowsDocuseries: 0,
    documentaries: 0,
    documentariesInternationalMovies: 0,
    docuseries: 0,
    dramas: 0,
    dramasInternationalMovies: 0,
    dramasRomanticMovies: 0,
    familyMovies: 0,
    fantasy: 0,
    horrorMovies: 0,
    internationalMoviesThrillers: 0,
    internationalTvShowsRomanticTvShowsTvDramas: 0,
    kidsTv: 0,
    languageTvShows: 0,
    musicals: 0,
    natureTv: 0,
    realityTv: 0,
    spirituality: 0,
    tvAction: 0,
    tvComedies: 0,
    tvDramas: 0,
    talkShowsTvComedies: 0,
    thrillers: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdMovie = await addMovie(formData as Movie);
      console.log('New movie added:', createdMovie);
      onSuccess();
    } catch (err) {
      console.error('Error adding movie:', err);
      alert('Failed to add movie. Please try again.');
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
      className="bg-white text-black p-4 rounded space-y-2"
    >
      <h2 className="text-xl font-bold mb-4">Add New Movie</h2>

      {renderTextField('title', 'Title')}
      {renderTextField('posterUrl', 'Poster URL')}
      {renderTextField('type', 'Type')}
      {renderTextField('director', 'Director')}
      {renderTextField('cast', 'Cast')}
      {renderTextField('country', 'Country')}
      {renderTextField('rating', 'Rating')}
      {renderTextField('duration', 'Duration')}
      {renderNumberField('releaseYear', 'Release Year')}
      <label className="block mb-2">
        Description:
        <textarea
          name="description"
          className="block w-full border p-1 rounded"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </label>

      <h3 className="font-semibold mt-4">Genres (0 or 1):</h3>
      <div className="grid grid-cols-2 gap-2">
        {[
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
        ].map((genreKey) =>
          renderNumberField(
            genreKey as keyof Movie,
            genreKey.replace(/([A-Z])/g, ' $1')
          )
        )}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Movie
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

export default NewMovieForm;
