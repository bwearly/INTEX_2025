import { Movie } from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL =
  'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/Movie';
const RECOMMENDER_API_URL =
  'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/api';
const AZURE_BLOB_URL = 'https://cinanicheposters.blob.core.windows.net/posters';

// Fetch movies with pagination and optional genre filtering
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

    // Attach poster URLs to each movie
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

// Search movies by title query
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${API_URL}/Search?query=${encodeURIComponent(query)}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();

    // Attach poster URLs to search results
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

// Submit a movie rating
export const rateMovie = async (
  showId: string,
  rating: number
): Promise<void> => {
  await fetch(`${API_URL}/Rate`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ showId, rating }),
  });
};

// Get the current user's rating for a specific movie
export const getMovieRating = async (
  showId: string
): Promise<number | null> => {
  const response = await fetch(`${API_URL}/Rating/${showId}`, {
    credentials: 'include',
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to get movie rating');
  const data = await response.json();
  return data.rating;
};

// Add a new movie to the database
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

// Update an existing movie's details
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

// Delete a movie from the database
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

// Retrieve available genres from the API
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

// Fetch only TV shows with pagination
export const fetchTvShows = async (
  pageSize: number,
  pageNum: number
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/TvShows?pageSize=${pageSize}&page=${pageNum}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch TV shows');
    }

    const data = await response.json();

    // Attach poster URLs to each show
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

// Get the currently authenticated user
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

// Fetch movie recommendations for the logged-in user
export const fetchRecommendedMovies = async (): Promise<Movie[]> => {
  try {
    const email = localStorage.getItem('userEmail');
    const response = await fetch(
      `${RECOMMENDER_API_URL}/Recommendations/GetUserRecommendations?email=${encodeURIComponent(email ?? '')}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch recommended movies');
    }

    const data = await response.json();

    // Attach poster URLs to recommendations
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

// Fetch movie details by ID
export const fetchMovieById = async (id: string): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const data = await response.json();

    // Attach poster URL to the fetched movie
    return {
      ...data.movies[0], // Assumes API returns an array with one movie
      posterUrl: `${AZURE_BLOB_URL}/${encodeURIComponent(data.movies[0].title)}.jpg`,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
