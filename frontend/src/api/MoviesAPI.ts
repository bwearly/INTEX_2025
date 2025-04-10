import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = 'https://localhost:5000/Movie';
const AZURE_BLOB_URL = 'https://cinanicheposters.blob.core.windows.net/posters';

// Fetch movies with pagination and genre filtering
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
      `${API_URL}/AllMovies?pageSize=${pageSize}&page=${pageNum}${
        selectedGenres.length ? `&${genreParams}` : ''
      }`,
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
    return {
      movies: moviesWithPosters,
      totalNumMovies: data.totalCount,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Search for movies by title
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `https://localhost:5000/Movie/Search?query=${encodeURIComponent(query)}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();

    // 👇 Use the exact movie title as filename
    const moviesWithPosters = data.map((movie: Movie) => ({
      ...movie,
      posterUrl: `${AZURE_BLOB_URL}/${encodeURIComponent(movie.title)}.jpg`,
    }));

    return moviesWithPosters;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const rateMovie = async (
  showId: string,
  rating: number
): Promise<void> => {
  await fetch(`https://localhost:5000/Movie/Rate`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ showId, rating }),
  });
};

export const getMovieRating = async (
  showId: string
): Promise<number | null> => {
  const response = await fetch(
    `https://localhost:5000/Movie/Rating/${showId}`,
    {
      credentials: 'include',
    }
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to get movie rating');
  const data = await response.json();
  return data.rating;
};

export const addMovie = async (movie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(movie),
    });
    if (!response.ok) throw new Error('Failed to add movie');
    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    throw error;
  }
};

export const updateMovie = async (
  showId: string,
  updatedMovie: Movie
): Promise<Movie> => {
  const response = await fetch(`${API_URL}/UpdateMovie/${showId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(updatedMovie),
  });
  if (!response.ok) {
    throw new Error(`Failed to update movie`);
  }
  return await response.json();
};

// Delete a movie
export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${showId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to delete movie');
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

// Fetch available genres from backend
export const fetchGenres = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/GetGenres`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

// :white_check_mark: Fetch TV Shows only
export const fetchTvShows = async (
  pageSize: number,
  pageNum: number
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `https://localhost:5000/Movie/TvShows?pageSize=${pageSize}&page=${pageNum}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch TV shows');
    }
    const data = await response.json();
    const showsWithPosters = data.movies.map((movie: Movie) => ({
      ...movie,
      posterUrl: `${AZURE_BLOB_URL}/${encodeURIComponent(movie.title)}.jpg`,
    }));
    return {
      movies: showsWithPosters,
      totalNumMovies: data.totalCount,
    };
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    throw error;
  }
};

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Not authenticated');
  }
  return await response.json();
}

// Fetch recommended movies for the logged-in user
export const fetchRecommendedMovies = async (): Promise<Movie[]> => {
  try {
    const email = localStorage.getItem('userEmail');
    const response = await fetch(
      `https://localhost:5000/api/YourControllerName/GetUserRecommendations?email=${encodeURIComponent(email ?? '')}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch recommended movies');
    }
    const data = await response.json();
    const moviesWithPosters = data.map((movie: Movie) => ({
      ...movie,
      posterUrl: `${AZURE_BLOB_URL}/${encodeURIComponent(movie.title)}.jpg`,
    }));
    return moviesWithPosters;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    return [];
  }
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
  try {
    // Use the correct GET request to fetch movie by ID
    const response = await fetch(`${API_URL}/Movie/${id}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();

    // Return the movie with the poster URL
    return {
      ...data.movies[0], // Assuming the response contains an array of movies
      posterUrl: `${AZURE_BLOB_URL}/${encodeURIComponent(data.movies[0].title)}.jpg`,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
