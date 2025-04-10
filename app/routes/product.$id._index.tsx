import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaShippingFast,
  FaPinterest,
  FaStar,
} from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const meta: MetaFunction = () => [
  { title: "Product Customization" },
  {
    name: "description",
    content: "facepillow - Customize your own cuddly pillow",
  },
];

export default function Index() {
  const carouselImages = [
    "/images/IMG_9823_1800x1800.jpg",
    "/images/IHeartYou_2_1800x1800.jpg",
    "/images/IHeartYouy_1800x1800.jpg",
    "/images/IHeartYou_2_1800x1800.jpg",
    "/images/Layer_14_2x_609c7bc7-051a-4af2-8649-9c18b80db164_720x.jpg",
    "/images/IMG_9823_1800x1800.jpg",
    "/images/Layer_14_2x_609c7bc7-051a-4af2-8649-9c18b80db164_720x.jpg",
  ];
  const facePillows = [
    {
      name: "I Heart Cuddles Face Pillow",
      price: 4900,
      image: "/images/IMG_9823_1800x1800.jpg",
    },
    {
      name: "I Love You Female Face Pillow",
      price: 4900,
      image: "/images/IHeartYou_2_1800x1800.jpg",
    },
    {
      name: "I Heart My Husband Face Pillow",
      price: 4900,
      image: "/images/IHeartYouy_1800x1800.jpg",
    },
    {
      name: "Cuddle Buddy Face Pillow",
      price: 4900,
      image:
        "/images/Layer_14_2x_609c7bc7-051a-4af2-8649-9c18b80db164_720x.jpg",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(carouselImages[0]);
  return (
    <main className="container mx-auto flex flex-col items-center justify-center">
      {/* Shipping Info */}
      <section className="w-full flex flex-col items-center py-5 min-h-screen">
        <p className="flex items-center gap-2 text-lg font-semibold">
          <FaShippingFast /> PRINTED & MADE WITHIN 48HRS
        </p>

        {/* Product Display Section */}
        <div className="flex flex-wrap mt-16 w-full min-h-[75vh]">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            {/* Main Product Image */}
            <div className="w-[70%] md:w-[100%] min-h-[50vh] max-h-[70vh] flex justify-center items-center">
              <img
                src={selectedImage}
                alt="Product"
                className="w-auto max-w-full h-full object-contain rounded-lg shadow-md transition-all duration-300"
              />
            </div>

            {/* Image Carousel */}
            <div className="w-[60%] md:w-[75%] mt-6">
              <Carousel>
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="max-sm:basis-1/3 overflow-hidden md:basis-1/3 lg:basis-1/5"
                    >
                      <button
                        className={`w-24 h-24 overflow-hidden  rounded-md cursor-pointer border-2 transition-all ${
                          selectedImage === image
                            ? "border-gray-500"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedImage(image)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedImage(image);
                          }
                        }}
                      >
                        <img src={image} alt={`Slide ${index + 1}`} />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>

          {/* Product Description */}
          <div className="w-full md:w-1/2 px-5 text-center space-y-6 max-sm:mt-10">
            <h1 className="text-2xl font-bold">I Heart You Face Pillow</h1>
            <p className="text-xl font-semibold text-blue-500">Tk 4,900.00</p>

            <a
              href="/app/routes/product.$id.customize"
              className="inline-block  bg-blue-500 text-white py-3 px-8 rounded-lg shadow-md text-2xl hover:bg-blue-600 w-full md:w-auto lg:w-full"
            >
              Create Now
            </a>

            {/* Product Features */}
            <ul className="list-disc text-left pl-5 space-y-3 font-semibold">
              <li>A Lovable Cuddly Custom Pillow</li>
              <li>Upload a Photo & we'll take care of the rest</li>
              <li>Made from luxury, soft feel fabrics</li>
              <li>Approx Size: 45cm(h) x 30cm(w)</li>
            </ul>

            <p className="font-medium text-start">
              Turn yourself or a loved one into a{" "}
              <span className="font-bold text-pink-600">I Heart You</span> Face
              Pillow. Simply upload your favorite photo to create the perfect
              Face Pillow.
            </p>

            <p className="font-semibold text-start">
              <strong>Note:</strong> Please upload a high-quality photo of your
              full face; we will match the skin tone accordingly.
            </p>

            {/* Delivery Info */}
            <div className="flex lg:flex sm:flex-col md:flex-col justify-center gap-2 text-lg font-bold">
              <span>Order now for delivery by:</span>
              <span className="text-blue-600">Wed 12 March</span>
            </div>

            {/* Social Sharing */}
            <div className="mt-4 flex justify-center gap-3 text-gray-700">
              <a
                href="https://www.facebook.com/sharer.php?u=https://www.snugzy.com/products/i-heart-you-custom-teddy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <FaFacebookSquare /> Facebook
              </a>
              <a
                href="https://twitter.com/share?url=https://www.snugzy.com/products/i-heart-you-custom-teddy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <FaTwitterSquare /> Twitter
              </a>
              <a
                href="https://www.pinterest.com/pin/create/button/?url=https://www.snugzy.com/products/i-heart-you-custom-teddy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <FaPinterest /> Pinterest
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 w-full">
        <div className=" text-center">
          <h2 className="text-2xl font-bold">1000s of Happy Customers!</h2>
          <h3 className="text-xl">Make someone's Day & Create your Snugzy</h3>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="mt-10 flex justify-center">
            <div className="grid grid-cols-4 gap-2 lg:gap-4 w-full max-w-4xl">
              {carouselImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-1 lg:p-2 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto aspect-[4/5] object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 w-full">
          <h2 className="text-center text-2xl font-extrabold">
            "The Funniest thing i've ever seen!"
          </h2>
          <div className="star flex gap-2 justify-center mt-3 text-center w-full">
            <FaStar className="text-4xl text-yellow-500" />
            <FaStar className="text-4xl text-yellow-500" />
            <FaStar className="text-4xl text-yellow-500" />
            <FaStar className="text-4xl text-yellow-500" />
            <FaStar className="text-4xl text-yellow-500" />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 w-full bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center mb-6 md:mb-8 lg:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              How it Works
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mt-2">
              Creating your Snugzy is super simple!
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="/images/how-it-works-snugzy_740d53b1-d478-4102-9f23-909da62a1924_1200x.webp"
              alt="How it Works"
              className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
      <section className="w-full max-w-full mx-auto my-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          You May Also Like...
        </h2>
        <div className="grid grid-cols-4 gap-2 lg:gap-6">
          {facePillows.map((pillow, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={pillow.image}
                alt={pillow.name}
                className="w-full h-auto aspect-[4/5] object-cover"
              />
              <div className="p-3 text-center">
                <h4 className="text-lg font-medium text-gray-700 max-sm:truncate">
                  {pillow.name}
                </h4>
                <p className="text-gray-600 font-semibold">
                  Tk {pillow.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="w-full" />
      <section className="w-full max-w-full mx-auto my-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Recently viewed
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {facePillows.map((pillow, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={pillow.image}
                alt={pillow.name}
                className="w-full h-auto aspect-[4/5] object-cover"
              />
              <div className="p-3 text-center">
                <h4 className="text-lg font-medium text-gray-700 max-sm:truncate">
                  {pillow.name}
                </h4>
                <p className="text-gray-600 font-semibold">
                  Tk {pillow.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
  

    </main>
  );
}
