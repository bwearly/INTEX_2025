import React from 'react';

interface Props {
  title: string;
  poster: string;
}

const MovieCard: React.FC<Props> = ({ title, poster }) => {
  return (
    <div style={{ width: '150px' }}>
      <img
        src={poster}
        alt={title}
        className="img-fluid rounded"
        style={{ height: '225px', objectFit: 'cover', width: '100%' }}
      />
      <p className="text-white text-center mt-2">{title}</p>
    </div>
  );
};

export default MovieCard;
