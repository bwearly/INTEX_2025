import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [movies, setMovies] = useState<Movie[]>([]);
  const [filtered, setFiltered] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await searchMovies(query);
        setMovies(result);
        setPage(1); // reset to first page when query changes
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

  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setFiltered(movies.slice(start, end));
  }, [movies, page, pageSize]);

  const totalPages = Math.ceil(movies.length / pageSize);

  return (
    <div className="container mt-5 pt-4">
      <h2 className="text-light mb-4">Search results for: <em>{query}</em></h2>
      {error && <p className="text-danger">{error}</p>}
      {filtered.length === 0 ? (
        <p className="text-light">No results found.</p>
      ) : (
        <>
          <div className="row mt-4">
            {filtered.map((movie) => (
              <div key={movie.showId} className="col-md-3 col-sm-6 mb-4">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </div>
  );
};

export default SearchResult;
