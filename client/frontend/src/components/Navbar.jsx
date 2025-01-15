import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({children}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll to change navbar style
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
   <div>
     <nav className={`w-full z-10 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-indigo-600">E-Shop</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/shop" className="text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
              <Link to="/category" className="text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Categories</Link>
              <Link to="/cart" className="text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <FaShoppingCart className="inline mr-1" /> Cart
              </Link>
              <Link to="/createaccount" className="text-gray-800 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <FaUser className="inline mr-1" /> Account
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-gray-800 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/shop" className="text-gray-800 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Shop</Link>
          <Link to="/category" className="text-gray-800 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Categories</Link>
          <Link to="/cart" className="text-gray-800 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            <FaShoppingCart className="inline mr-1" /> Cart
          </Link>
          <Link to="/createaccount" className="text-gray-800 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            <FaUser className="inline mr-1" /> Account
          </Link>
        </div>
      </div>
    </nav>
    <div>
        {children}
    </div>
   </div>
    
  );
};

export default NavBar;
