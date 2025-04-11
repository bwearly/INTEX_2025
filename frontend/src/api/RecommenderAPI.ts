import { Movie } from '../types/Movie';

const RECOMMENDER_API_URL =
  'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/api/Recommendations';

const API_URL =
  'https://cineniche2-5-hpdrgkerdmfbahcd.eastus-01.azurewebsites.net/Movie';

const AZURE_BLOB_URL = 'https://cinanicheposters.blob.core.windows.net/posters';

// Fetch a list of recommended movie IDs for a given showId from a specific endpoint
export async function fetchRecommendationIds(
  endpoint: string,
  showId: string
): Promise<string[]> {
  try {
    const res = await fetch(
      `${RECOMMENDER_API_URL}/${endpoint}?show_id=${showId}`,
      {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data.recommendations ?? [];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint} recommendations:`, error);
    return [];
  }
}

// Fetch detailed movie data for a list of show IDs
export const fetchMoviesByIds = async (ids: string[]): Promise<Movie[]> => {
  try {
    const res = await fetch(`${API_URL}/ByIds`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(ids),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();

    // Attach poster URLs for each movie
    return (data.movies ?? []).map((movie: Movie) => ({
      ...movie,
      posterUrl: `${AZURE_BLOB_URL}/${encodeURIComponent(movie.title)}.jpg`,
    }));
  } catch (err) {
    console.error('Failed to fetch movie details by IDs:', err);
    return [];
  }
};

// Maps genre keys to the appropriate recommendation endpoint
export const recommenderMapByColumn: Record<
  string,
  (id: string) => Promise<string[]>
> = {
  action: (id) => fetchRecommendationIds('GetMovieAction', id),
  adventure: (id) => fetchRecommendationIds('GetMovieAdventure', id),
  children: (id) => fetchRecommendationIds('GetMovieChildren', id),
  comedies: (id) => fetchRecommendationIds('GetMovieComedies', id),
  comediesdramainternational: (id) =>
    fetchRecommendationIds('GetMovieComediesDramaInternational', id),
  comediesinternational: (id) =>
    fetchRecommendationIds('GetMovieComediesInternational', id),
  documentaries: (id) => fetchRecommendationIds('GetMovieDocumentaries', id),
  dramas: (id) => fetchRecommendationIds('GetMovieDramas', id),
  dramasinternational: (id) =>
    fetchRecommendationIds('GetMovieDramasInternational', id),
  dramasromantic: (id) => fetchRecommendationIds('GetMovieDramasRomantic', id),
  family: (id) => fetchRecommendationIds('GetMovieFamily', id),
  fantasy: (id) => fetchRecommendationIds('GetMovieFantasy', id),
  horrormovies: (id) => fetchRecommendationIds('GetMovieHorror', id),
  internationalthrillers: (id) =>
    fetchRecommendationIds('GetMovieInternationalThrillers', id),
  musicals: (id) => fetchRecommendationIds('GetMovieMusicals', id),
  spirituality: (id) => fetchRecommendationIds('GetMovieSpirituality', id),
  thrillers: (id) => fetchRecommendationIds('GetMovieThrillers', id),

  tvshowaction: (id) => fetchRecommendationIds('GetTvShowAction', id),
  tvshowadventure: (id) => fetchRecommendationIds('GetTvShowAdventure', id),
  animeinternational: (id) =>
    fetchRecommendationIds('GetTvShowAnimeInternational', id),
  tvshowcomedies: (id) => fetchRecommendationIds('GetTvShowComedies', id),
  crimedocuseries: (id) =>
    fetchRecommendationIds('GetTvShowCrimeDocuseries', id),
  docuseries: (id) => fetchRecommendationIds('GetTvShowDocuseries', id),
  tvshowdramas: (id) => fetchRecommendationIds('GetTvShowDramas', id),
  tvshowfantasy: (id) => fetchRecommendationIds('GetTvShowFantasy', id),
  internationalromanticdrama: (id) =>
    fetchRecommendationIds('GetTvShowInternationalRomanticDrama', id),
  tvshowkids: (id) => fetchRecommendationIds('GetTvShowKids', id),
  language: (id) => fetchRecommendationIds('GetTvShowLanguage', id),
  nature: (id) => fetchRecommendationIds('GetTvShowNature', id),
  reality: (id) => fetchRecommendationIds('GetTvShowReality', id),
  thriller: (id) => fetchRecommendationIds('GetTvShowThriller', id),
};

// Fetch all show-level recommendations for a single showId
export async function fetchShowRecommendationsById(
  showId: string
): Promise<string[]> {
  try {
    const res = await fetch(
      `${RECOMMENDER_API_URL}/GetShowId?show_id=${showId}`,
      {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const data = await res.json();

    // Extract all keys starting with 'recommendation'
    const recKeys = Object.keys(data).filter((key) =>
      key.toLowerCase().startsWith('recommendation')
    );

    return recKeys.map((key) => data[key]).filter(Boolean);
  } catch (err) {
    console.error('Failed to fetch show recommendations:', err);
    return [];
  }
}
