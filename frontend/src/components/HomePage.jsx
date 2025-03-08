import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300 pl-6 pr-6">
      {/* Logo Section */}
      <h1 className="text-xl text-black">Current Patient = {userData.patientID}</h1>
      <img src="/logo.svg" alt="MedicoTalk Logo" className="w-50 h-50" />

      <h1 className="text-4xl font-bold text-white mb-8">Presents</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Diagnosis Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img
            src="/checklist-9030329_1280.png"
            alt="Diagnosis"
            className="w-60 h-60 mb-4 rounded-md"
          />
          <h2 className="text-xl font-semibold text-gray-800">Get Diagnosed</h2>
          <p className="text-gray-600 text-base mb-4">
            Upload your medical reports and get an AI-powered diagnosis.
          </p>
          <button
            onClick={() => navigate("/dignosis")}
            className="bg-green-500 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-600 transition text-lg"
          >
            Get Diagnosed
          </button>
        </div>

        {/* Chatbot Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img
            src="/fingers-5946228_1280.jpg"
            alt="Chatbot"
            className="w-60 h-60 mb-4 rounded-md"
          />
          <h2 className="text-xl font-semibold text-gray-800">AI Chatbot</h2>
          <p className="text-gray-600 text-base mb-4">
            Talk to our AI chatbot for instant medical assistance.
          </p>
          <button
            onClick={() => navigate("/chatbot")}
            className="bg-green-500 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-green-600 transition text-lg"
          >
            Chat with Bot
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
