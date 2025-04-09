// src/pages/HorizontalTest.tsx
import React from 'react';
import MovieCard from '../../components/common/MovieCard';
import { Movie } from '../../types/Movie';

const dummyMovies: Movie[] = [
  {
    showId: '1',
    title: 'Test 1',
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
    showId: '2',
    title: 'Test 2',
    releaseYear: 2022,
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
    showId: '3',
    title: 'Test 3',
    releaseYear: 2021,
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

const HorizontalTest: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Horizontal Movie Row Test</h1>

      {/* Scrollable Movie Row */}
      <div className="overflow-x-auto scrollbar-hide w-full">
        <div
          className="flex gap-4 scroll-smooth snap-x snap-mandatory"
          style={{ flexWrap: 'nowrap' }} // ✅ Force no wrapping
        >
          {dummyMovies.map((movie) => (
            <div key={movie.showId} className="snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalTest;
