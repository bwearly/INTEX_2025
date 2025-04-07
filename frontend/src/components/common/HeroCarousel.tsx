import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const HeroCarousel = () => {
  return (
    <div className="mb-4">
      <Carousel>
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img
              className="d-block"
              src="/posters/sample.jpg"
              alt="Comedy Central"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center">
            <img
              className="d-block"
              src="/posters/another.jpg"
              alt="Action Blast"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
