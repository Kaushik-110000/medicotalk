import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-16 md:px-16">
        {/* Left Content */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
            MedicoChat Welcomes You
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Revolutionizing healthcare through AI-powered diagnosis and patient care solutions.
          </p>
          <div className="flex flex-col space-y-4 w-full md:w-3/4">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 text-lg"
            >
              Register New Patient
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 text-lg"
            >
              Diagnose a Patient
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 relative">
          <img 
            src="/robot.jpg" 
            alt="AI Revolution" 
            className="rounded-lg transform -rotate-3 hover:rotate-0 transition duration-500"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}
          />
          <div className="absolute bottom-0 right-0 bg-white p-4 rounded-lg shadow-lg -mb-8 mr-8">
            <h3 className="text-xl font-bold text-blue-900">New Revolution in AI Phase</h3>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
          Our Specialities
        </h2>

        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          <img 
            src="/reports.jpg" 
            alt="Report Analysis" 
            className="md:w-1/2 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
          />
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Smart Report Analysis
            </h3>
            <p className="text-gray-600 text-lg">
              Our advanced ML models analyze medical reports with 98% accuracy, providing 
              instant insights and potential diagnoses.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-16 gap-8">
          <img 
            src="/prescription.jpg" 
            alt="Prescription Analysis" 
            className="md:w-1/2 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
          />
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Prescription Verification
            </h3>
            <p className="text-gray-600 text-lg">
              Automated analysis of doctor prescriptions to ensure accuracy and 
              compatibility with patient history.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img 
            src="/chatbot.jpg" 
            alt="AI Chatbot" 
            className="md:w-1/2 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
          />
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              AI Symptom Checker
            </h3>
            <p className="text-gray-600 text-lg">
              24/7 available chatbot that helps diagnose conditions based on symptoms,
              providing preliminary advice and recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;