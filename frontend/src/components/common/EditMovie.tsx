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
    try {
      await updateMovie(Number(formData.showId), formData);
      onSuccess();
    } catch (err) {
      console.error('Error updating movie:', err);
    }
  };

  return (
    <div className="bg-white text-black rounded p-6 w-[500px] shadow-xl relative">
      <button className="absolute top-2 right-2 text-black" onClick={onCancel}>
        ✖
      </button>

      <h2 className="text-xl font-bold mb-4">Edit Movie</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
