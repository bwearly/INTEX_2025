// src/components/common/Recommended.tsx
import React from 'react';
import { Movie } from '../../types/Movie';
import MovieRow from './MovieRow';

const dummyRecommended: Movie[] = [
  {
    showId: 'rec1',
    title: 'Recommended 1',
    releaseYear: 2023,
    posterUrl: '/images.png',
    action: 1,
    adventure: 0,
    comedies: 0,
    dramas: 0,
    type: '',
    director: '',
    cast: '',
    country: '',
    rating: '',
    duration: '',
    description: '',
    animeSeriesInternationalTvShows: 0,
    britishTvShowsDocuseriesInternationalTvShows: 0,
    children: 0,
    comediesDramasInternationalMovies: 0,
    comediesInternationalMovies: 0,
    comediesRomanticMovies: 0,
    crimeTvShowsDocuseries: 0,
    documentaries: 0,
    documentariesInternationalMovies: 0,
    docuseries: 0,
    dramasInternationalMovies: 0,
    dramasRomanticMovies: 0,
    familyMovies: 0,
    fantasy: 0,
    horrorMovies: 0,
    internationalMoviesThrillers: 0,
    internationalTvShowsRomanticTvShowsTvDramas: 0,
    kidsTv: 0,
    languageTvShows: 0,
    musicals: 0,
    natureTv: 0,
    realityTv: 0,
    spirituality: 0,
    tvAction: 0,
    tvComedies: 0,
    tvDramas: 0,
    talkShowsTvComedies: 0,
    thrillers: 0,
  },
  {
    showId: 'rec2',
    title: 'Recommended 2',
    releaseYear: 2023,
    posterUrl: '/images.png',
    action: 1,
    adventure: 0,
    comedies: 0,
    dramas: 0,
    type: '',
    director: '',
    cast: '',
    country: '',
    rating: '',
    duration: '',
    description: '',
    animeSeriesInternationalTvShows: 0,
    britishTvShowsDocuseriesInternationalTvShows: 0,
    children: 0,
    comediesDramasInternationalMovies: 0,
    comediesInternationalMovies: 0,
    comediesRomanticMovies: 0,
    crimeTvShowsDocuseries: 0,
    documentaries: 0,
    documentariesInternationalMovies: 0,
    docuseries: 0,
    dramasInternationalMovies: 0,
    dramasRomanticMovies: 0,
    familyMovies: 0,
    fantasy: 0,
    horrorMovies: 0,
    internationalMoviesThrillers: 0,
    internationalTvShowsRomanticTvShowsTvDramas: 0,
    kidsTv: 0,
    languageTvShows: 0,
    musicals: 0,
    natureTv: 0,
    realityTv: 0,
    spirituality: 0,
    tvAction: 0,
    tvComedies: 0,
    tvDramas: 0,
    talkShowsTvComedies: 0,
    thrillers: 0,
  },
];

interface RecommendedProps {
  onClick?: (movie: Movie) => void;
  onDelete?: (id: string) => void;
}

const Recommended: React.FC<RecommendedProps> = ({ onClick, onDelete }) => {
  return (
    <MovieRow
      title="Recommended"
      movies={dummyRecommended}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
};

export default Recommended;
