import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieById } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import { fetchYoutubeTrailer } from '../../api/YouTubeAPI';
import StarRating from './StarRating';
import MovieRow from './MovieRow';
import {
  recommenderMapByColumn,
  fetchMoviesByIds,
} from '../../api/RecommenderAPI';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerId, setTrailerId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [recommended, setRecommended] = useState<Movie[]>([]);

  useEffect(() => {
    if (id) {
      const match = document.cookie.match(
        new RegExp(`(?:^|; )rating_${id}=([^;]*)`)
      );
      if (match) {
        setRating(parseInt(match[1]));
      }
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const getMovie = async () => {
      try {
        const data = await fetchMovieById(id);
        console.log('Fetched movie:', data);
        setMovie(data);

        const genreKeys = Object.keys(recommenderMapByColumn);
        const matchedGenreKeys = genreKeys.filter(
          (key) => (data as any)[key] === 1
        );
        console.log('Matched genre keys:', matchedGenreKeys);

        setTimeout(async () => {
          const trailer = await fetchYoutubeTrailer(data.title);
          console.log('Fetched trailer ID:', trailer);
          if (trailer) setTrailerId(trailer);
        }, 2000);

        let allRecs: Movie[] = [];

        for (const key of matchedGenreKeys) {
          if (recommenderMapByColumn[key]) {
            try {
              const ids = await recommenderMapByColumn[key](id);
              const recs = await fetchMoviesByIds(ids);
              console.log(`Fetched ${key} recommendations:`, recs);
              allRecs.push(...recs);
            } catch (recErr) {
              console.error(`Error fetching ${key} recommendations:`, recErr);
            }
          }
        }

        const uniqueRecs = Array.from(
          new Map(allRecs.map((m) => [m.showId, m])).values()
        );

        const filteredRecs = uniqueRecs.filter((m) => m.showId !== data.showId);
        console.log('Final filtered recommendations:', filteredRecs);

        setRecommended(filteredRecs);
      } catch (err) {
        console.error('Error loading movie details:', err);
      }
    };

    getMovie();
  }, [id]);

  if (!movie) return <div style={{ color: 'white' }}>Loading...</div>;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        overflowY: 'auto',
        paddingTop: '16vh',
        backdropFilter: 'blur(3px)',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: '#111',
          borderRadius: '12px',
          padding: '2rem',
          display: 'flex',
          gap: '2rem',
          maxWidth: '1000px',
          width: '90%',
          color: 'white',
          boxShadow: '0 0 20px rgba(0,0,0,0.6)',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        <button
          onClick={() => navigate('/home')}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            fontSize: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: '4px',
          }}
          aria-label="Close"
        >
          &times;
        </button>

        <div style={{ width: '400px', minWidth: '400px' }}>
          {trailerId ? (
            <iframe
              width="400"
              height="600"
              src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
              title="YouTube trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ borderRadius: '8px', border: 'none' }}
            />
          ) : (
            <img
  src={movie.posterUrl}
  alt={movie.title}
  style={{ width: '400px', borderRadius: '8px' }}
  onError={(e) =>
    ((e.target as HTMLImageElement).src = '/poster1.png')
  }
/>

          )}
        </div>

        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            {movie.title}
          </h1>
          <div>
            <strong>Your Rating:</strong>
            <StarRating
              movieId={id!}
              currentRating={rating}
              setRating={setRating}
            />
          </div>

          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
  <strong>Cast:</strong>{' '}
  {movie.cast.includes(',')
    ? movie.cast
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name.length > 0)
        .join(', ')
    : movie.cast
        .split(' ')
        .reduce((acc: string[], val, i, arr) => {
          if (i % 2 === 0) {
            acc.push(val + (arr[i + 1] ? ' ' + arr[i + 1] : ''));
          }
          return acc;
        }, [])
        .join(', ')}
</p>




          <p>
            <strong>Description:</strong> {movie.description}
          </p>
        </div>
      </div>

      {recommended.length > 0 && (
        <div className="w-full mt-8 mb-16 px-6">
          <MovieRow
            title="Shows Like This"
            movies={recommended}
            onClick={(movie) => navigate(`/movie/${movie.showId}`)}
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
