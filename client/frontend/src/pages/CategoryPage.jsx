import React, { useState } from "react";
import { useEffect } from "react";
import { FaStar, FaFilter, FaSort, FaHeart, FaSearch, FaAngleLeft, FaAngleRight, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/Slices/ProductsSlice';
import { addToCart, removeCartItem, getCartItems, updateQuantity } from "../redux/Slices/CartSlice";
import CartComponent from "../components/CartComponent";
import QuickViewModal from "../components/QuickViewModal";


const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("popular");
  const [showQuickView, setShowQuickView] = useState(null);
  const [quantity, setQuantity] = useState(0)
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [showCart, setShowCart] = useState(false);


  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth)
  const { products, loading, error } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.cart)

  const handleQuickView = (productId) => {
    setShowQuickView(productId);
  };

  // Using useEffect to dispatch fetchProducts action when the component is mounted
  useEffect(() => {
    if (accessToken) {
      dispatch(getCartItems());
    }
    dispatch(fetchProducts());
  }, [dispatch, accessToken]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product.id));
    dispatch(getCartItems());

  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Filters */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Shop by Category</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <FaShoppingCart className="text-2xl" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {items.length}
              </span>
            )}
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mt-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSort className="absolute left-3 top-3 text-gray-400" />
              <select
                className="pl-10 pr-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSort(e.target.value)}
                value={sortOption}
              >
                <option value="popular">Most Popular</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
            <button
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              aria-label="Filter products"
            >
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>


      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <Link>
                  <img
                    src={
                      product.images?.image?.startsWith('http')
                        ? product.images.image
                        : `https://${product.images?.image ?? 'default-image.jpg'}`
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default navigation
                    handleQuickView(product.id);
                  }}
                  className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Quick view"
                >
                  Quick View
                </button>
                <button
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <FaHeart className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <Link to="/product">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">${product.price}</p>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span></span>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event from bubbling to the Link
                    handleAddToCart(product)
                  }}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          aria-label="Previous page"
        >
          <FaAngleLeft className="text-xl" />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-full ${currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 3}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          aria-label="Next page"
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={products.find((p) => p.id === showQuickView)}
          onClose={() => setShowQuickView(null)}
        />
      )}

      {/* Shopping Cart Sidebar */}
      {showCart && <CartComponent setShowCart={setShowCart} />}
    </div>
  );
};

export default CategoryPage;
