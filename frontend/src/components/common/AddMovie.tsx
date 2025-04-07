import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { addMovie } from '../../api/MoviesAPI';

interface AddMovieProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddMovie = ({ onSuccess, onCancel }: AddMovieProps) => {
  const [formData, setFormData] = useState<Movie>({
    showId: '',
    posterUrl: '',
    type: '',
    title: '',
    director: '',
    cast: '',
    country: '',
    releaseYear: new Date().getFullYear(),
    rating: '',
    duration: '',
    description: '',
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
    const { name, value } = e.target;
    const isNumber = typeof (formData as any)[name] === 'number';
    setFormData((prev) => ({
      ...prev,
      [name]: isNumber ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMovie(formData);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black p-6 rounded w-96"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Movie</h2>

      <label className="block mb-2">
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-2">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-2">
        Poster URL:
        <input
          type="text"
          name="posterUrl"
          value={formData.posterUrl}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <label className="block mb-2">
        Genre: Action (1 = yes, 0 = no)
        <input
          type="number"
          name="action"
          value={formData.action}
          onChange={handleChange}
          className="border p-2 w-full mt-1"
        />
      </label>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddMovie;
