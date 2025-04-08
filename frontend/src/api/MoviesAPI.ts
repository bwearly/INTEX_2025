import { Movie } from '../types/Movie';

interface fetchMovieResponse {
  movies: Movie[];
}

const API_URL = 'https://localhost:5000/Movie';

const AZURE_BLOB_URL = 'https://cinanicheposters.blob.core.windows.net/posters';

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[]
): Promise<fetchMovieResponse> => {
  try {
    const genreParams = selectedGenres
      .map((genre) => `genres=${encodeURIComponent(genre)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/AllMovies?pageSize=${pageSize}&page=${pageNum}${selectedGenres.length ? `&${genreParams}` : ''}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();

    const moviesWithPosters = data.movies.map((movie: Movie) => ({
      ...movie,
      posterUrl: `${AZURE_BLOB_URL}/${encodeURIComponent(movie.title)}.jpg`,
    }));

    return { movies: moviesWithPosters };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Add a new movie
export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to add movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

// Update an existing movie
export const updateMovie = async (
  movieID: number,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${movieID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error('Failed to update movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

// Delete a movie
export const deleteMovie = async (movieID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${movieID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

// Search bar
export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/Movie/Search?query=${encodeURIComponent(query)}`,
      {
        credentials: 'include',
      }
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
