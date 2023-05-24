import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { SkeletonImage } from "../../atoms/SkeletonImage";

import styles from "./Carousel.module.css";

interface CarouselItem {
  title?: string;
  describe?: string;
  img?: string;
  target?: string;
}

interface CarouselOptions {
  interval?: number;
  showThumbs?: boolean;
  useKeyboardArrows?: boolean;
  showStatus?: boolean;
  showIndicators?: boolean;
}

interface Props {
  carouselItem: CarouselItem[];
  carouselOptions: CarouselOptions;
  style?: React.CSSProperties;
}

function CarouselSlide({ carouselItem, carouselOptions, style }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <section style={style}>
      <Carousel
        autoPlay
        infiniteLoop
        interval={carouselOptions.interval}
        showThumbs={carouselOptions.showThumbs}
        useKeyboardArrows={carouselOptions.useKeyboardArrows}
        showStatus={carouselOptions.showStatus}
        showIndicators={carouselOptions.showIndicators}
        className={styles.carousel}
      >
        {carouselItem.map((item, index) => (
          <div key={index}>
            <div>
              <h2>{item.title}</h2>
              <p>{item.describe}</p>
            </div>
            <img
              src={item.img}
              alt={item.describe}
              onLoad={handleImageLoad}
              style={{ visibility: isImageLoading ? "hidden" : "visible" }}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default CarouselSlide;
