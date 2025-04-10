import { Movie } from '../types/Movie';

// 1. Fetch recommended show IDs from the backend
export async function fetchRecommendationIds(
  endpoint: string,
  showId: string
): Promise<string[]> {
  try {
    const res = await fetch(
      `https://localhost:5000/api/Recommendations/${endpoint}?show_id=${showId}`,
      {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const data = await res.json();
    return data.recommendations;
  } catch (error) {
    console.error(`❌ Failed to fetch ${endpoint} recommendations:`, error);
    return [];
  }
}

// 2. Fetch full movie objects by showId
export async function fetchMoviesByIds(showIds: string[]): Promise<Movie[]> {
  try {
    const res = await fetch('https://localhost:5000/Movie/AllMovies', {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();
    const allMovies: Movie[] = data.movies;

    const matched = allMovies.filter((m) => showIds.includes(m.showId));
    const unmatched = showIds.filter(
      (id) => !allMovies.some((m) => m.showId === id)
    );

    console.log(
      '✅ Matched movie IDs:',
      matched.map((m) => m.showId)
    );
    console.warn('❌ Skipped (not found in DB):', unmatched);

    return matched;
  } catch (error) {
    console.error('❌ Failed to fetch movies by ID:', error);
    return [];
  }
}

// 3. Genre-to-endpoint map (same keys, just using fetchRecommendationIds now)
export const recommenderMapByColumn: {
  [key: string]: (id: string) => Promise<string[]>;
} = {
  action: (id) => fetchRecommendationIds('GetMovieAction', id),
  adventure: (id) => fetchRecommendationIds('GetMovieAdventure', id),
  children: (id) => fetchRecommendationIds('GetMovieChildren', id),
  comedies: (id) => fetchRecommendationIds('GetMovieComedies', id),
  comediesDramasInternationalMovies: (id) =>
    fetchRecommendationIds('GetMovieComediesDramaInternational', id),
  comediesInternationalMovies: (id) =>
    fetchRecommendationIds('GetMovieComediesInternational', id),
  documentaries: (id) => fetchRecommendationIds('GetMovieDocumentaries', id),
  dramas: (id) => fetchRecommendationIds('GetMovieDramas', id),
  dramasInternationalMovies: (id) =>
    fetchRecommendationIds('GetMovieDramasInternational', id),
  dramasRomanticMovies: (id) =>
    fetchRecommendationIds('GetMovieDramasRomantic', id),
  familyMovies: (id) => fetchRecommendationIds('GetMovieFamily', id),
  fantasy: (id) => fetchRecommendationIds('GetMovieFantasy', id),
  horrorMovies: (id) => fetchRecommendationIds('GetMovieHorror', id),
  internationalMoviesThrillers: (id) =>
    fetchRecommendationIds('GetMovieInternationalThrillers', id),
  musicals: (id) => fetchRecommendationIds('GetMovieMusicals', id),
  spirituality: (id) => fetchRecommendationIds('GetMovieSpirituality', id),
  thrillers: (id) => fetchRecommendationIds('GetMovieThrillers', id),

  // TV Shows
  tvAction: (id) => fetchRecommendationIds('GetTvShowAction', id),
  tvComedies: (id) => fetchRecommendationIds('GetTvShowComedies', id),
  tvDramas: (id) => fetchRecommendationIds('GetTvShowDramas', id),
  talkShowsTvComedies: (id) => fetchRecommendationIds('GetTvShowComedies', id),
  animeSeriesInternationalTvShows: (id) =>
    fetchRecommendationIds('GetTvShowAnimeInternational', id),
  britishTvShowsDocuseriesInternationalTvShows: (id) =>
    fetchRecommendationIds('GetTvShowCrimeDocuseries', id),
  crimeTvShowsDocuseries: (id) =>
    fetchRecommendationIds('GetTvShowCrimeDocuseries', id),
  docuseries: (id) => fetchRecommendationIds('GetTvShowDocuseries', id),
  internationalTvShowsRomanticTvShowsTvDramas: (id) =>
    fetchRecommendationIds('GetTvShowInternationalRomanticDrama', id),
  kidsTv: (id) => fetchRecommendationIds('GetTvShowKids', id),
  languageTvShows: (id) => fetchRecommendationIds('GetTvShowLanguage', id),
  natureTv: (id) => fetchRecommendationIds('GetTvShowNature', id),
  realityTv: (id) => fetchRecommendationIds('GetTvShowReality', id),
  tvShowAdventure: (id) => fetchRecommendationIds('GetTvShowAdventure', id),
  tvShowFantasy: (id) => fetchRecommendationIds('GetTvShowFantasy', id),
  tvShowThriller: (id) => fetchRecommendationIds('GetTvShowThriller', id),
  tvShowInternationalRomanticDrama: (id) =>
    fetchRecommendationIds('GetTvShowInternationalRomanticDrama', id),
};
