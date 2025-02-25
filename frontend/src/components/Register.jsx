import React, { useState } from "react";
import authService from "../Backend/patient.config.js";
import errorTeller from "../Backend/errorTeller.js";
import { useNavigate } from "react-router";
function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.RegisterPatient(formData).then((res) => {
        // console.log(res.data.message)
        alert(`New Patient Id = ${res.data?.message?.patientID}`);
        navigate("/login");
      });
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
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }}
        />
        <div className="absolute inset-0 bg-blue-900/30 flex items-center p-12">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">
              Begin Your Health Journey
            </h2>
            <p className="text-xl">AI-powered healthcare monitoring</p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              MedicoChat
            </h1>
            <p className="text-gray-600">New Patient Registration</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg space-y-4"
          >
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border-b-2 border-blue-200 focus:border-blue-500 py-3 px-2 text-gray-700 leading-tight focus:outline-none transition"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  className="w-full border-b-2 border-blue-200 focus:border-blue-500 py-3 px-2 text-gray-700 leading-tight focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border-b-2 border-blue-200 focus:border-blue-500 py-3 px-2 text-gray-700 leading-tight focus:outline-none transition"
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                  className="w-full border-b-2 border-blue-200 focus:border-blue-500 py-3 px-2 text-gray-700 leading-tight focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                  className="w-full border-b-2 border-blue-200 focus:border-blue-500 py-3 px-2 text-gray-700 leading-tight focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm pt-2">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] mt-6"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
