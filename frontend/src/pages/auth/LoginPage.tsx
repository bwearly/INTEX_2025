import * as React from "react";
import { useEffect, useState } from "react";

// 🔧 Dummy type for now (replace with your actual interface later)
type Movie = {
  id: number;
  title: string;
  genres: string[];
};

const ManageMoviesPage = () => {
  const [groupedMovies, setGroupedMovies] = useState<Record<string, Movie[]>>({});

  // Hardcoded admin name
  const adminName = "Casey";

  useEffect(() => {
    // 🎬 Hardcoded movie data
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: "The Grand Budapest Hotel",
        genres: ["Comedy", "Drama"],
      },
      {
        id: 2,
        title: "Inception",
        genres: ["Action", "Adventure"],
      },
      {
        id: 3,
        title: "Spirited Away",
        genres: ["Adventure", "Fantasy"],
      },
      {
        id: 4,
        title: "Parasite",
        genres: ["Drama", "Thriller"],
      },
      {
        id: 5,
        title: "The Lego Movie",
        genres: ["Comedy", "Action"],
      },
    ];

    // Group movies by genre
    const grouped: Record<string, Movie[]> = {};
    mockMovies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (!grouped[genre]) grouped[genre] = [];
        grouped[genre].push(movie);
      });
    });

    setGroupedMovies(grouped);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {adminName}!</h1>

      {Object.entries(groupedMovies).map(([genre, movies]) => (
        <div key={genre} className="mb-10">
          <h2 className="text-xl font-semibold mb-2">{genre}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative bg-gray-200 border rounded-md flex flex-col justify-between h-64 hover:shadow-lg transition"
              >
                {/* Dummy Poster */}
                <div className="flex-grow flex items-center justify-center text-center px-2">
                  <span className="text-sm font-medium">{movie.title}</span>
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <button className="bg-white text-black px-2 py-1 text-sm mx-1 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 text-sm mx-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageMoviesPage;
