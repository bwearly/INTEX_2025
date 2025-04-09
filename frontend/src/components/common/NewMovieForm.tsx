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
    action: 0,
    adventure: 0,
    // Add any other fields your backend requires...
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'releaseYear' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const createdMovie = await addMovie(formData as Movie);
      console.log('New movie added:', createdMovie); // ✅ Debug showId
      onSuccess(); // will refresh movie list in parent
    } catch (err) {
      console.error('Error adding movie:', err);
      alert('Failed to add movie. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white text-black p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Add New Movie</h2>

      <label>
        Title:
        <input
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Type:
        <input
          name="type"
          value={formData.type || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Director:
        <input
          name="director"
          value={formData.director || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Cast:
        <input
          name="cast"
          value={formData.cast || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Country:
        <input
          name="country"
          value={formData.country || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Rating:
        <input
          name="rating"
          value={formData.rating || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Duration:
        <input
          name="duration"
          value={formData.duration || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Release Year:
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Action:
        <input
          type="number"
          name="action"
          value={formData.action || 0}
          onChange={handleChange}
        />
      </label>

      {/* Add more genres as needed */}

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
