import React, { useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import {
  fetchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../../api/MoviesAPI";
import MovieRow from "../../components/common/MovieRow";

const PAGE_SIZE = 100;

const ManageMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const response = await fetchMovies(PAGE_SIZE, 1, []);
      setMovies(response.movies);
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleSave = async () => {
    if (!selectedMovie) return;
    try {
      if (!selectedMovie.ShowId) {
        await addMovie(selectedMovie);
      } else {
        await updateMovie(Number(selectedMovie.ShowId), selectedMovie);
      }
      await loadMovies();
      setSelectedMovie(null);
    } catch (error) {
      alert("Error saving movie.");
    }
  };

  const handleDelete = async () => {
    if (!selectedMovie?.ShowId) return;
    try {
      await deleteMovie(Number(selectedMovie.ShowId));
      await loadMovies();
      setSelectedMovie(null);
    } catch (error) {
      alert("Error deleting movie.");
    }
  };

  const extractGenres = (movie: Movie): string[] => {
    return Object.keys(movie).filter(
      (key) =>
        typeof (movie as any)[key] === "number" &&
        (movie as any)[key] === 1 &&
        key !== "ReleaseYear"
    );
  };

  const genreMap: Record<string, Movie[]> = {};
  movies.forEach((movie) => {
    const genres = extractGenres(movie);
    genres.forEach((genre) => {
      if (!genreMap[genre]) genreMap[genre] = [];
      genreMap[genre].push(movie);
    });
  });

  return (
    <div className="bg-dark text-light min-h-screen">
      <div className="px-5 pt-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Manage Movies</h1>
        <button
          onClick={() =>
            setSelectedMovie({
              ShowId: "",
              Title: "",
              Type: "",
              Director: "",
              Cast: "",
              Country: "",
              ReleaseYear: new Date().getFullYear(),
              Rating: "",
              Duration: "",
              Description: "",
              Action: 0,
              Adventure: 0,
              AnimeSeriesInternationalTvShows: 0,
              BritishTvShowsDocuseriesInternationalTvShows: 0,
              Children: 0,
              Comedies: 0,
              ComediesDramasInternationalMovies: 0,
              ComediesInternationalMovies: 0,
              ComediesRomanticMovies: 0,
              CrimeTvShowsDocuseries: 0,
              Documentaries: 0,
              DocumentariesInternationalMovies: 0,
              Docuseries: 0,
              Dramas: 0,
              DramasInternationalMovies: 0,
              DramasRomanticMovies: 0,
              FamilyMovies: 0,
              Fantasy: 0,
              HorrorMovies: 0,
              InternationalMoviesThrillers: 0,
              InternationalTvShowsRomanticTvShowsTvDramas: 0,
              KidsTv: 0,
              LanguageTvShows: 0,
              Musicals: 0,
              NatureTv: 0,
              RealityTv: 0,
              Spirituality: 0,
              TvAction: 0,
              TvComedies: 0,
              TvDramas: 0,
              TalkShowsTvComedies: 0,
              Thrillers: 0,
            })
          }
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Movie
        </button>
      </div>

      <div className="container-fluid px-5">
        {Object.entries(genreMap)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([genre, genreMovies]) => (
            <MovieRow
              key={genre}
              title={genre}
              movies={genreMovies.map((m) => ({
                id: Number(m.ShowId),
                title: m.Title,
                poster: "/posters/sample.jpg", // Placeholder poster
              }))}
              onClick={(movie: { id: { toString: () => string; }; }) =>
                setSelectedMovie(movies.find((m) => m.ShowId === movie.id.toString()) || null)
              }
            />
          ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded w-96">
            <h2 className="text-xl font-semibold mb-4">
              {selectedMovie.ShowId ? "Edit Movie" : "Add Movie"}
            </h2>

            <label className="block mb-2">
              Title:
              <input
                type="text"
                value={selectedMovie.Title}
                onChange={(e) =>
                  setSelectedMovie({ ...selectedMovie, Title: e.target.value })
                }
                className="border p-2 w-full mt-1"
              />
            </label>

            <label className="block mb-2">
              Description:
              <textarea
                value={selectedMovie.Description}
                onChange={(e) =>
                  setSelectedMovie({
                    ...selectedMovie,
                    Description: e.target.value,
                  })
                }
                className="border p-2 w-full mt-1"
              />
            </label>

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setSelectedMovie(null)}
              >
                Cancel
              </button>

              {selectedMovie.ShowId && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMoviesPage;
