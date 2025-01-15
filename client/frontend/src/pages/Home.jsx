import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom'

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const carouselData = [
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      title: "Summer Collection 2024",
      description: "Discover the latest trends in fashion",
      link: "#",
    },
    {
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      title: "Exclusive Deals",
      description: "Up to 50% off on selected items",
      link: "#",
    },
    {
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      title: "New Arrivals",
      description: "Check out our latest products",
      link: "#",
    },
  ];

  const categories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" },
    { name: "Home & Living", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container items-center mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc"
                alt="Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold text-gray-800">EShop</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/home" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Shop
              </a>
              <a href="category" className="text-gray-600 hover:text-gray-900 transition-colors">
                Categories
              </a>
              <div className="flex items-center space-x-4">
               <FaSearch className="text-gray-600 hover:text-gray-900 cursor-pointer" />
               <Link to='/cart'> <FaShoppingCart className="text-gray-600 hover:text-gray-900 cursor-pointer" /></Link>
               <Link to='/createaccount'> <FaUser className="text-gray-600 hover:text-gray-900 cursor-pointer" /></Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Carousel Section */}
      <div className="relative min-h-screen pt-16">
        <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            aria-label="Previous slide"
          >
            <BsChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            aria-label="Next slide"
          >
            <BsChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
        {/* Categories */}
        <section className="py-20 px-4 relative z-10 mt-0">
        <h2 className="text-2xl font-semibold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="relative">
              <img src={category.image} alt={category.name} className="w-full h-60 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
                <span className="text-white text-xl font-bold">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Text Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Welcome to Our Online Store
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover a world of amazing products at unbeatable prices. We offer a wide selection
              of high-quality items, from fashion to electronics, all carefully curated for your
              shopping pleasure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Free Shipping</h3>
                <p className="text-gray-600">On orders over $50</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                <p className="text-gray-600">Always here to help</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Money Back</h3>
                <p className="text-gray-600">30-day guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
