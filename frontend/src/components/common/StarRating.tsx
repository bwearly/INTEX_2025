import React from 'react';

interface StarRatingProps {
  movieId: string;
  currentRating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  movieId,
  currentRating,
  setRating,
}) => {
  const handleRate = (rating: number) => {
    // Save to session cookie
    document.cookie = `rating_${movieId}=${rating}; path=/; SameSite=Lax`;
    setRating(rating);
  };

  return (
    <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.5rem' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRate(star)}
          style={{
            cursor: 'pointer',
            fontSize: '1.75rem',
            color: star <= currentRating ? '#facc15' : '#555',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
