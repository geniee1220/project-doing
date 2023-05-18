import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

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
  // useEffect(() => {
  //   if (groups) {
  //     setIsPageloading(false);
  //   }
  // }, [groups]);

  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

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
        className="h-full"
      >
        {carouselItem.map((item, index) => (
          <div className="carousel-slide h-[800px]" key={index}>
            <div className="carousel-description absolute absolute left-1/2 transform -translate-x-1/2 bottom-1/3 mb-10 text-left w-full lg:container px-4 md:px-10 ">
              <h2 className="text-2xl lg:text-4xl font-bold text-white">
                {item.title}
              </h2>
              <p className="my-2 text-white">{item.describe}</p>
            </div>
            <img
              src={item.img}
              alt={item.describe}
              onLoad={handleImageLoad}
              style={{ display: isLoading ? "block" : "block" }}
              className="h-full"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default CarouselSlide;
