import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { items } = useSelector((state) => state.cart);
  const validItems = items.filter((item) => item.product_quantity > 0); // Filter out items with quantity 0
  const totalPrice = validItems
    .reduce((total, item) => total + item.product_price * item.product_quantity, 0)
    .toFixed(2);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {validItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {validItems.map((item) => (
              <div key={item.product_id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="font-semibold">{item.product_name}</h2>
                  <p className="text-gray-600">
                    ${item.product_price} × {item.product_quantity}
                  </p>
                </div>
                <span>${(item.product_price * item.product_quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <h2 className="text-lg font-semibold">Total: ${totalPrice}</h2>
            <Link to='/confirm'><button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
              Confirm Purchase
            </button></Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
