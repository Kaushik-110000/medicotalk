import React, { useState } from "react";
import authService from "../Backend/patient.config.js";
import errorTeller from "../Backend/errorTeller.js";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/authSlice.js";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [patientNumber, setPatientNumber] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientID = `PAT-${patientNumber}`;

    try {
      await authService.LoginPatient({ patientID }).then((res) => {
        console.log(res.data.data);
        dispatch(storeLogin({ userData: res.data.data }));
      });
      alert("Login successful!");
      navigate("/home"); // Redirect after login
    } catch (error) {
      setError(errorTeller(error));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden md:block w-1/2 relative overflow-hidden">
        <img 
          src="/robonurse.jpg" 
          alt="AI Medical Assistant" 
          className="w-full h-full object-cover transform scale-110"
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
        />
        <div className="absolute inset-0 bg-blue-900/30 flex items-center p-12">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-xl">AI-powered healthcare at your fingertips</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">MedicoChat</h1>
            <p className="text-gray-600">Secure Patient Login</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Patient ID
              </label>
              <div className="flex items-center border-b-2 border-blue-200 focus-within:border-blue-500 transition">
                <span className="text-blue-600 font-medium">PAT-</span>
                <input
                  type="number"
                  value={patientNumber}
                  onChange={(e) => setPatientNumber(e.target.value)}
                  placeholder="Enter your number"
                  className="w-full py-3 px-2 text-gray-700 leading-tight focus:outline-none"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              Dignose
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Patient not registered?{" "}
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;