import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');

  // Calculate total price from cart
  const { items } = useSelector((state) => state.cart);
  const validItems = items.filter((item) => item.product_quantity > 0); // Filter out items with quantity 0
  const totalPrice = validItems
    .reduce((total, item) => total + item.product_price * item.product_quantity, 0)
    .toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('accessToken'); // Get the token from localStorage

    try {
      // Send request with Authorization header
      await axios.post(
        'http://127.0.0.1:8000/order/add/', 
        {
          totalAmount: totalPrice,
          accountNumber: accountNumber,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in request headers
          },
        }
      );
      navigate('/category'); // Redirect to success page
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Your Payment Details</h2>
        <p className="text-gray-600 mb-6">Total Amount: <span className="font-semibold">${totalPrice}</span></p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Account Number</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full py-3 mt-4 rounded-lg font-semibold text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition duration-300`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
