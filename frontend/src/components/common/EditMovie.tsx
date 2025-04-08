import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { updateMovie } from '../../api/MoviesAPI';

interface EditMovieProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

const EditMovie: React.FC<EditMovieProps> = ({
  movie,
  onSuccess,
  onCancel,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMovie(Number(formData.showId), formData);
    onSuccess();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Movie Poster */}
      <div className="md:w-1/2">
        <img
          src={`http://localhost:5000/posters/${movie.posterUrl || 'default.jpg'}`}
          alt={movie.title}
          className="rounded w-full h-auto object-cover shadow-lg"
        />
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="md:w-1/2 space-y-4 text-white">
        <h2 className="text-2xl font-bold">Edit Movie</h2>

        <div>
          <label className="block font-medium mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 h-32"
          />
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            type="button"
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
