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
  { name: "description", content: "facepillow - Customize your own cuddly pillow" },
];

import React from "react";

const ProfessionalProfile = () => {
  return (
    <div className="bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <header className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-6">
              <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                
                <img className="w-56 h-56 object-cover rounded-full" src="../zoynul.png" alt="" />
              </div>
            </div>
            <div className="p-8 flex-1">
              <h1 className="text-3xl font-bold text-gray-800">zoynul</h1>
              <p className="mt-2 text-indigo-600 font-semibold">
                Shopify App Developer
              </p>
              <p className="mt-4 text-gray-600">
              I specialize in Shopify app development using Remix and also enjoy Shopify theme development.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <i className="fas fa-globe text-xl"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600">
                  <i className="fas fa-envelope text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Services Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                My Services
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Service 1 */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-indigo-300 transition-all">
                  <div className="text-indigo-600 mb-4">
                    <i className="fas fa-laptop-code text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Shopify App Development
                  </h3>
                  <p className="text-gray-600">
                  Custom Shopify apps using Remix for enhanced store functionality.


                  </p>
                </div>

                {/* Service 2 */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-indigo-300 transition-all">
                  <div className="text-indigo-600 mb-4">
                    <i className="fas fa-mobile-alt text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Shopify Theme Development
                  </h3>
                  <p className="text-gray-600">
                  Custom Shopify themes with optimized UI/UX and performance.
                  </p>
                </div>

                {/* Service 3 */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-indigo-300 transition-all">
                  <div className="text-indigo-600 mb-4">
                    <i className="fas fa-paint-brush text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Shopify Checkout & Cart Validation
                  </h3>
                  <p className="text-gray-600">
                  Advanced checkout and cart validation for Shopify Plus stores.
                  </p>
                </div>

                {/* Service 4 */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-indigo-300 transition-all">
                  <div className="text-indigo-600 mb-4">
                    <i className="fas fa-server text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Shopify Functional Extensions
                  </h3>
                  <p className="text-gray-600">
                  Custom payment, shipping, and order validation solutions.
                  </p>
                </div>

                   {/* Service 5 */}
                   <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-indigo-300 transition-all">
                  <div className="text-indigo-600 mb-4">
                    <i className="fas fa-server text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  WooCommerce Customization
                  </h3>
                  <p className="text-gray-600">
                  WooCommerce single product page customization with a custom image editor.
                  </p>
                </div>

                  {/* Service 6 */}
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-indigo-300 transition-all">
                  <div className="text-indigo-600 mb-4">
                    <i className="fas fa-server text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Web Development
                  </h3>
                  <p className="text-gray-600">
                 Scalable web applications using modern frameworks like Remix.
                  </p>
                </div>
              </div>
            </div>

            {/* Experience Section */}
           
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Contact
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-envelope text-indigo-600 mt-1 mr-3"></i>
                  <span className="text-black font-bold"><a href="https://www.fiverr.com/trust_coder1" target="_blank">Contact me via Fiverr</a></span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone text-indigo-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">WhatsApp  <a href="https://wa.me/8801712345678?text=Hello sir"> +8801735361634</a></span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt text-indigo-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">Pabna, Bangladesh</span>
                </li>
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Skills
              </h2>
              <div className="space-y-4">
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-700">HTML/CSS</span>
      <span className="text-gray-500">90%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "90%" }}></div>
    </div>
  </div>
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-700">JavaScript</span>
      <span className="text-gray-500">85%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "85%" }}></div>
    </div>
  </div>
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-700">Remix</span>
      <span className="text-gray-500">85%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "85%" }}></div>
    </div>
  </div>
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-700">React</span>
      <span className="text-gray-500">80%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "80%" }}></div>
    </div>
  </div>
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-700">Node.js</span>
      <span className="text-gray-500">75%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "75%" }}></div>
    </div>
  </div>
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-gray-700">Prisma</span>
      <span className="text-gray-500">75%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "75%" }}></div>
    </div>
  </div>
</div>

            </div>

            {/* Education */}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;

