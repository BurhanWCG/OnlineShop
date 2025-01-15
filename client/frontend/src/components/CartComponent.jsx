import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { removeCartItem, updateQuantity } from '../redux/Slices/CartSlice'; // Import your actions
import { Link } from 'react-router-dom';

const CartComponent = ({ setShowCart }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items); // Replace with your actual state structure
  const cart = useSelector((state) => state.cart.items); // Adjust based on your Redux store structure

  // Handle removing item from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeCartItem(productId)); // Dispatch the action to remove product from cart
  };

  // Handle incrementing quantity
  const handleIncrementQuantity = (productId, currentQuantity) => {
    dispatch(updateQuantity({ productId, newQuantity: currentQuantity + 1 }));
  };

  // Handle decrementing quantity
  const handleDecrementQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ productId, newQuantity: currentQuantity - 1 }));
    }
  };

  // UseEffect to watch for cart changes and update immediately
  useEffect(() => {
    // Optionally, perform any side effects or log here, like analytics tracking, etc.
  }, [cart]); // Re-run the effect whenever the cart changes

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <button
          onClick={() => setShowCart(false)}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close cart"
        >
          ×
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <FaShoppingCart className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product_id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={
                    item.product_image?.startsWith('http')
                      ? item.product_image
                      : `https://${item.product_image || 'default-image.jpg'}`
                  }
                  alt={item.product_name}
                  className="w-24 h-24 object-cover mb-4 rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product_name}</h3>
                  <p className="text-gray-600">${item.product_price}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <button
                      onClick={() => handleDecrementQuantity(item.product_id, item.product_quantity)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      disabled={item.product_quantity <= 1}
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span>{item.product_quantity}</span>
                    <button
                      onClick={() => handleIncrementQuantity(item.product_id, item.product_quantity)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.product_id)}
                  className="p-2 text-red-500 hover:text-red-700"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">
                $
                {cart
                  .reduce((total, item) => total + item.product_price * item.product_quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
            <Link to="/checkout">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
