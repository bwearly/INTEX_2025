export interface Movie {
  // --- Basic Movie Metadata ---
  posterUrl: string; // URL of the movie/show's poster image
  showId: string; // Unique identifier for the movie/show
  type: string; // Either "Movie" or "TV Show"
  title: string; // Title of the movie/show
  director: string; // Name of the director (can be empty)
  cast: string; // Comma-separated list of cast members
  country: string; // Country of origin
  releaseYear: number; // Year the movie/show was released
  rating: string; // Content rating (e.g., G, PG, TV-MA)
  duration: string; // Length or duration as a string (e.g., "1h 30min")
  description: string; // Short synopsis or description

  // --- Genre Flags (binary: 1 = belongs to genre, 0 = does not) ---

  // Action and Adventure
  action: number; // General action category
  adventure: number; // Adventure-themed content

  // Anime & International TV
  animeSeriesInternationalTvShows: number; // Anime series that are international TV shows

  // British & Docuseries
  britishTvShowsDocuseriesInternationalTvShows: number; // British TV shows that are docuseries and international

  // Family and Children
  children: number; // Content suitable for children
  familyMovies: number; // Movies focused on family-friendly themes
  kidsTv: number; // TV shows for kids

  // Comedies (various combinations)
  comedies: number; // General comedy content
  comediesDramasInternationalMovies: number; // Comedy-dramas that are international movies
  comediesInternationalMovies: number; // International comedies
  comediesRomanticMovies: number; // Romantic comedy movies

  // Crime & Docuseries
  crimeTvShowsDocuseries: number; // Crime-based TV docuseries

  // Documentaries
  documentaries: number; // General documentaries
  documentariesInternationalMovies: number; // International documentary films
  docuseries: number; // Serialized documentary shows

  // Drama
  dramas: number; // General dramas
  dramasInternationalMovies: number; // International drama movies
  dramasRomanticMovies: number; // Romantic dramas

  // Fantasy
  fantasy: number; // Fantasy-themed content

  // Horror
  horrorMovies: number; // Horror genre movies

  // International Thrillers
  internationalMoviesThrillers: number; // Thriller films that are international

  // Romantic TV Dramas
  internationalTvShowsRomanticTvShowsTvDramas: number; // Romantic international TV dramas

  // Language-based TV
  languageTvShows: number; // Foreign-language television shows

  // Musicals
  musicals: number; // Musical performances or stories

  // Nature
  natureTv: number; // Nature-focused TV content

  // Reality and Talk Shows
  realityTv: number; // Reality television content
  talkShowsTvComedies: number; // Talk shows with comedic elements

  // Spiritual
  spirituality: number; // Spiritually-themed content

  // TV Genres
  tvAction: number; // Action-based TV shows
  tvComedies: number; // Comedy-based TV shows
  tvDramas: number; // Drama-based TV shows

  // Thrillers
  thrillers: number; // Thriller genre content
}
