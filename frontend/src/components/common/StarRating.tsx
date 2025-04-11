import React from 'react';

interface StarRatingProps {
  movieId: string; // Unique identifier for the movie
  currentRating: number; // Current user rating (1–5)
  setRating: (rating: number) => void; // Setter function for parent component
}

const StarRating: React.FC<StarRatingProps> = ({
  movieId,
  currentRating,
  setRating,
}) => {
  // Handles user click on a star
  const handleRate = (rating: number) => {
    // Store rating in a session cookie for persistence
    document.cookie = `rating_${movieId}=${rating}; path=/; SameSite=Lax`;
    setRating(rating);
  };

  return (
    <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.5rem' }}>
      {/* Render 5 stars */}
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRate(star)}
          style={{
            cursor: 'pointer',
            fontSize: '1.75rem',
            color: star <= currentRating ? '#facc15' : '#555', // Highlight selected stars
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
