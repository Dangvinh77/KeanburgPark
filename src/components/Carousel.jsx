import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/components/CustomCarousel.scss";

const CustomCarousel = ({ images, interval = 3000, linkTo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRef = useRef(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, interval);
    return () => clearInterval(intervalId);
  }, [interval, nextSlide]);

  return (
    <div className="custom-carousel">
      <div className="carousel-wrapper">
        <div
          className="carousel-slides"
          ref={slideRef}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.4s ease-in-out",
          }}
        >
          {images.map((image, index) => (
            <div className="carousel-slide" key={index}>
              <img src={image} alt={`Slide ${index + 1}`} />
              {/* Empty div for consistent spacing */}
              <div className="carousel-caption-placeholder"></div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control prev"
          onClick={prevSlide}
          disabled={isTransitioning}
        >
          ❮
        </button>
        <button
          className="carousel-control next"
          onClick={nextSlide}
          disabled={isTransitioning}
        >
          ❯
        </button>
      </div>

      {/* Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            disabled={isTransitioning}
          ></button>
        ))}
      </div>
      {/* Global Caption Container */}
      <div className="carousel-caption global-caption">
        <a href={linkTo} className="more-link">
          More
          <i className="bx bx-dots-horizontal-rounded"> </i>
        </a>
      </div>
    </div>
  );
};

export default CustomCarousel;
