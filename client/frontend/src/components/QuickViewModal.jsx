import React from 'react'
import { FaStar } from 'react-icons/fa';


  const QuickViewModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close quick view"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={
              product.images?.image?.startsWith('http')
                ? product.images.image
                : `https://${product.images?.image ?? 'default-image.jpg'}`
            }
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <div>
            <p className="text-2xl font-bold mb-2">${product.price}</p>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2">{product.rating}/5</span>
            </div>
            <p className="text-gray-600 mb-4">{product.category}</p>
            <button
              onClick={() => {
                addToCart(product);
                onClose();
                setShowCart(true);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
export default QuickViewModal
