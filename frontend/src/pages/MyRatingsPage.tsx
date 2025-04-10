import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchMovies } from '../api/MoviesAPI';

const MyRatingsPage = () => {
  const [ratedMovies, setRatedMovies] = useState<
    { movie: Movie; rating: number }[]
  >([]);

  useEffect(() => {
    const loadRatedMovies = async () => {
      const ratings = JSON.parse(localStorage.getItem('myRatings') || '{}');
      const allMovies = (await fetchMovies(500, 1, [])).movies;
      const filtered = allMovies
        .filter((m) => ratings[m.showId])
        .map((m) => ({ movie: m, rating: ratings[m.showId] }));

      setRatedMovies(filtered);
    };

    loadRatedMovies();
  }, []);

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">My Ratings</h1>
      {ratedMovies.length === 0 ? (
        <p>You haven’t rated any movies yet.</p>
      ) : (
        <ul className="space-y-4">
          {ratedMovies.map(({ movie, rating }) => (
            <li key={movie.showId} className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p>Rating: {rating} ⭐</p>
              <p className="text-sm text-gray-300">{movie.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRatingsPage;
