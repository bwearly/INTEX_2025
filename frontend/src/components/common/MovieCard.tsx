import React from 'react';

interface MovieCardProps {
  title: string;
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterUrl }) => {
  return (
    <div className="text-center mx-2">
      <img src={posterUrl} alt={title} style={{ width: '150px', height: '220px', objectFit: 'cover' }} />
      <p className="text-white mt-2">{title}</p>
    </div>
  );
};

export default MovieCard;
