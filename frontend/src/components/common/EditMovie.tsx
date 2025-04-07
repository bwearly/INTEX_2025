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
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black p-6 rounded w-96"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Movie</h2>

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

      <div className="flex justify-between mt-4">
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
  );
};

export default EditMovie;
