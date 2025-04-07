import * as React from "react";
import { Movie } from "../../types/Movie";

interface MoviesListProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const extractGenres = (movie: Movie): string[] => {
  return Object.keys(movie).filter(
    (key) =>
      typeof (movie as any)[key] === "number" &&
      (movie as any)[key] === 1 &&
      key !== "ReleaseYear" && // exclude non-genre numeric fields
      key !== "Action" // optional: filter out known non-genre flags if needed
  );
};

const MoviesList: React.FC<MoviesListProps> = ({ movies, onMovieClick }) => {
  const groupedMovies: Record<string, Movie[]> = {};

  movies.forEach((movie) => {
    const genres = extractGenres(movie);
    genres.forEach((genre) => {
      if (!groupedMovies[genre]) groupedMovies[genre] = [];
      groupedMovies[genre].push(movie);
    });
  });

  return (
    <>
      {Object.entries(groupedMovies)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([genre, genreMovies]) => (
          <div key={genre} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{genre}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {genreMovies.map((movie) => (
                <div
                  key={movie.ShowId}
                  onClick={() => onMovieClick?.(movie)}
                  className={`border rounded p-4 shadow hover:shadow-lg transition text-center ${
                    onMovieClick ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="text-sm font-medium">{movie.Title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default MoviesList;
