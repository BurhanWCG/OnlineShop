import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBox, FaHeart, FaCog, FaSignOutAlt, FaAddressCard, FaCreditCard } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  
  useEffect(() => {
    if (!accessToken) {
      navigate("/createaccount");
    }
  }, [accessToken, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-10">
        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Account</h2>
          <p className="text-gray-500">Welcome back! Manage your account and orders here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-6">
              <li>
                <Link to="/profile" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <FaUser className="mr-2" /> My Profile
                </Link>
              </li>
              <li>
                <Link to="/orders" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <FaBox className="mr-2" /> My Orders
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <FaHeart className="mr-2" /> Wishlist
                </Link>
              </li>
              <li>
                <Link to="/addresses" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <FaAddressCard className="mr-2" /> Address Book
                </Link>
              </li>
              <li>
                <Link to="/payment-methods" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <FaCreditCard className="mr-2" /> Payment Methods
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center text-gray-800 hover:text-indigo-600">
                  <FaCog className="mr-2" /> Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    navigate("/createaccount");
                  }}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </aside>

          {/* Main Content Area */}
          {/* <main className="col-span-3 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value="Burhan"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value="burhan@example.com"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value="+88 456 789"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value="Jamalpur"
                  readOnly
                />
              </div>
            </div>
          </main> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
