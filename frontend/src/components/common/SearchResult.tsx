import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import MovieCard from './MovieCard';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await searchMovies(query);
        setMovies(result);
        setCurrentPage(1);
        setError('');
      } catch (err) {
        setError('Search failed');
        setMovies([]);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const totalPages = Math.ceil(movies.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const currentMovies = movies.slice(start, start + pageSize);

  return (
    <div className="container mt-5 pt-4">
      <h2 className="text-light mb-4">
        Search results for: <em>{query}</em>
      </h2>
      {error && <p className="text-danger">{error}</p>}
      {currentMovies.length === 0 ? (
        <p className="text-light">No results found.</p>
      ) : (
        <>
          <div className="row mt-4">
            {currentMovies.map((movie) => (
              <div key={movie.showId} className="col-md-3 col-sm-6 mb-4">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {/* 👇 Clean, minimal pagination controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
              <button
                className="btn btn-outline-light"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span className="text-light">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-outline-light"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;
