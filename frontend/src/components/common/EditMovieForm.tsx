import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { updateMovie } from '../../api/MoviesAPI';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

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
  const [formData, setFormData] = useState<Movie>({
    ...movie,
    showId: movie.showId || '',
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    genreOptions.filter((g) => formData[g as keyof Movie] === 1)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedGenres(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.showId || formData.showId.trim() === '') {
      alert('ShowId is required.');
      return;
    }

    const genrePayload = genreOptions.reduce((acc, genre) => {
      acc[genre] = selectedGenres.includes(genre) ? 1 : 0;
      return acc;
    }, {} as any);

    try {
      await updateMovie(formData.showId, {
        ...formData,
        ...genrePayload,
      });
      onSuccess();
    } catch (err) {
      console.error('Error updating movie:', err);
      alert('Failed to update movie. Please try again.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        overflowY: 'auto',
        paddingTop: '8vh',
        backdropFilter: 'blur(3px)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#111',
          borderRadius: '12px',
          padding: '2rem',
          color: 'white',
          boxShadow: '0 0 20px rgba(0,0,0,0.6)',
          maxWidth: '1000px',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onCancel}
          type="button"
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            fontSize: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Edit Movie</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <input
            name="posterUrl"
            placeholder="Poster URL"
            value={formData.posterUrl}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <input
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <input
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <input
            name="cast"
            placeholder="Cast"
            value={formData.cast}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <input
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <input
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            value={formData.releaseYear}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="bg-black text-white border rounded p-2 col-span-2"
            rows={4}
          />
        </div>

        <label className="font-semibold mt-4">Genres:</label>
        <select
          multiple
          value={selectedGenres}
          onChange={handleGenreChange}
          className="bg-black text-white border rounded p-2"
          style={{ height: '200px' }}
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre.replace(/([A-Z])/g, ' $1')}
            </option>
          ))}
        </select>

        <div className="flex gap-4 mt-4">
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
    </div>
  );
};

export default EditMovieForm;
