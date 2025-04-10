import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem,CarouselPrevious,
  CarouselNext } from './carousel';


const ImageGallery = ({ previewImages }) => {

  return (
    <div className="image-gallery flex flex-col items-center w-full">
       <Carousel
      opts={{
        align: "start", // Align the carousel to the start for proper alignment
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {previewImages?.map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 max-sm:basis-1/1 max-sm:flex max-sm:justify-center max-sm:items-center">
            <div className="p-1 border">
              <img className='max-sm:w-32' src={image} alt={index+1} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Buttons */}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  );
};

export default ImageGallery;
