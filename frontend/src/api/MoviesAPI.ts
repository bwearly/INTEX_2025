import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = 'https://localhost:5000/Movie';

// Fetch
export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const genreParams = selectedGenres
      .map((g) => `genres=${encodeURIComponent(g)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/AllMovies?pageSize=${pageSize}&page=${pageNum}${selectedGenres.length ? `&${genreParams}` : ''}`
    );

    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Add
export const addMovie = async (movie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });

    if (!response.ok) throw new Error('Failed to add movie');
    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

// Update
export const updateMovie = async (
  showId: string,
  updatedMovie: Movie
): Promise<Movie> => {
  const response = await fetch(`${API_URL}/UpdateMovie/${showId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMovie),
  });

  if (!response.ok) {
    throw new Error(`Failed to update movie`);
  }

  return await response.json();
};

// Delete
export const deleteMovie = async (showId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${showId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete movie');
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

// Search bar
export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/Movie/Search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};
