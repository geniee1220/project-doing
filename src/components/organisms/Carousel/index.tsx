import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

interface CarouselItem {
  title: string;
  describe: string;
  img: string;
  target: string;
}

interface CarouselOptions {
  interval?: number;
  showThumbs?: boolean;
  useKeyboardArrows?: boolean;
  showStatus?: boolean;
}

interface Props {
  carouselItem: CarouselItem[];
  carouselOptions: CarouselOptions;
}

function CarouselSlide({ carouselItem, carouselOptions }: Props) {
  return (
    <section className="pt-16">
      <Carousel
        autoPlay
        infiniteLoop
        interval={carouselOptions.interval}
        showThumbs={carouselOptions.showThumbs}
        useKeyboardArrows={carouselOptions.useKeyboardArrows}
        showStatus={carouselOptions.showStatus}
        className="h-full"
      >
        {carouselItem.map((item, index) => (
          <div className="carousel-slide h-[800px] " key={index}>
            <div className="carousel-description absolute absolute left-1/2 transform -translate-x-1/2 bottom-1/3 mb-10 text-left w-full lg:container px-4 md:px-10 ">
              <h2 className="text-2xl lg:text-4xl font-bold text-white">
                {item.title}
              </h2>
              <p className="my-2 text-white">{item.describe}</p>

              <Link to={item.target} className="btn btn-sm lg:btn-md mt-3">
                바로가기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <img src={item.img} alt={item.describe} className="h-full" />
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default CarouselSlide;
