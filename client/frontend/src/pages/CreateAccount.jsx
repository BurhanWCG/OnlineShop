import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userSignup, userLogin, forgotPassword, resetPassword } from "../Redux/Slices/AuthSlice";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: enter email, Step 2: enter code

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "signup") {
      dispatch(userSignup(formData));
    } else {
      dispatch(userLogin(formData))
      .unwrap()
      .then((result)=>{
        if(result){
          navigate('/profile')
        }
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (step === 1) {
      dispatch(forgotPassword({ email: formData.email }));
      setStep(2);
    } else if (step === 2) {
      // Dispatch an action to reset the password using the code
      dispatch(resetPassword({code: verificationCode, newPassword }));
      setForgotPasswordMode(false);
      setStep(1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={() => setForgotPasswordMode(false)}
        >
          ✕
        </button>

        {!forgotPasswordMode ? (
          <>
            {/* Tabs for Login and Signup */}
            <div className="flex justify-between mb-8 border-b">
              <button
                className={`w-1/2 py-3 font-semibold text-center ${activeTab === "login" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
              <button
                className={`w-1/2 py-3 font-semibold text-center ${activeTab === "signup" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("signup")}
              >
                Signup
              </button>
            </div>

            {/* Login and Signup Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-6 relative">
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>


              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {activeTab === "signup" ? "Create Account" : "Log In"}
              </button>
            </form>

            {activeTab === "login" && (
              <p
                className="text-center text-purple-600 cursor-pointer mt-4 hover:underline"
                onClick={() => setForgotPasswordMode(true)}
              >
                Forgot Password?
              </p>
            )}
            <div className="mt-15 w-full justify-center items-center">
              < GoogleLoginButton/>
            </div>
          </>
        ) : (
          <form onSubmit={handleForgotPassword}>
            {step === 1 ? (
              <>
                <h2 className="text-center text-xl font-semibold mb-6">Forgot Password</h2>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
                  Send Verification Code
                </button>
              </>
            ) : (
              <>
                <h2 className="text-center text-xl font-semibold mb-6">Reset Password</h2>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Enter the code"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
                  Reset Password
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
