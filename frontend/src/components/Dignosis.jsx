import React, { useState } from "react";
import doctorService from "../Backend/doctor.config.js";
import errorTeller from "../Backend/errorTeller.js";
import { useNavigate } from "react-router-dom";

const diagnosisOptions = [
  {
    id: "tumor",
    title: "Tumor Detection",
    image: "/brain.jpg",
    desc: "Analyze MRI/CT scans for brain tumor detection",
  },
  {
    id: "pneumonia",
    title: "Pneumonia Check",
    image: "/chest.jpg",
    desc: "Chest X-ray analysis for pneumonia detection",
  },
  {
    id: "covid",
    title: "COVID-19 Test",
    image: "/covid.jpg",
    desc: "CT scan analysis for COVID-19 diagnosis",
  },
  {
    id: "blood",
    title: "Blood Report",
    image: "/reports.jpg",
    desc: "Complete blood count (CBC) analysis",
  },
  {
    id: "prescription",
    title: "Prescription",
    image: "/prescription.jpg",
    desc: "Digital prescription analysis & recommendations",
  },
];

function Diagnosis() {
  const [file, setFile] = useState(null);
  const [diagnosisType, setDiagnosisType] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDiagnosis = async () => {
    if (!file || !diagnosisType) {
      setError("Please select a file and diagnosis type.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("report", file);

    try {
      let response;
      switch (diagnosisType) {
        case "tumor":
          response = await doctorService.tumorCheck(formData);
          break;
        case "pneumonia":
          response = await doctorService.pneumoniaCheck(formData);
          break;
        case "covid":
          response = await doctorService.covidCheck(formData);
          break;
        case "blood":
          response = await doctorService.bloodReportCheck(formData);
          break;
        case "prescription":
          response = await doctorService.doctorPrescriptionCheck(formData);
          break;
        default:
          throw new Error("Invalid diagnosis type");
      }
      setResult(response.data.data.result);
    } catch (error) {
      setError(errorTeller(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Medical Diagnosis Model
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {diagnosisOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setDiagnosisType(option.id)}
              className={`cursor-pointer group relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                diagnosisType === option.id
                  ? "ring-4 ring-blue-500 scale-105"
                  : "hover:scale-105"
              }`}
            >
              <img
                src={option.image}
                alt={option.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-bold text-lg">{option.title}</h3>
                  <p className="text-sm opacity-90">{option.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {diagnosisType && (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Upload your{" "}
                {diagnosisOptions.find((o) => o.id === diagnosisType).title}
              </h2>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-gray-600 text-center">
                  {file ? file.name : "Click to upload file"}
                </p>
              </label>

              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleDiagnosis}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Report"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Result Overlay - Keep existing overlay structure */}
        {result && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Existing overlay content */}
            {result && (
              <div className="fixed inset-0 flex items-center justify-center bg-blue-300 bg-opacity-75 backdrop-blur-sm ">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl relative mx-4 max-h-[90vh] overflow-y-auto">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-2xl"
                    onClick={() => setResult("")}
                  >
                    ✖
                  </button>
                  <h2 className="text-2xl font-bold mb-6 text-blue-800 border-b-2 border-blue-100 pb-4">
                    Detailed Diagnosis Report
                  </h2>
                  <div className="prose prose-blue prose-lg max-w-none">
                    {result.split("\n\n").map((section, index) => {
                      const isList = section.startsWith("* ");
                      const isHeading = section.startsWith("**");
                      const isBold = section.startsWith("**");

                      return (
                        <div key={index} className="mb-6">
                          {isHeading ? (
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                              {section.replace(/\*\*/g, "")}
                            </h3>
                          ) : isBold ? (
                            <p className="text-gray-700 leading-relaxed font-bold">
                              {section.replace(/\*\*/g, "")}
                            </p>
                          ) : isList ? (
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                              {section.split("\n").map((item, i) => (
                                <li key={i}>{item.replace("* ", "").trim()}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-700 leading-relaxed">
                              {section}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="w-1/3 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition"
                    onClick={() => {
                      navigate("/chatbot");
                    }}
                  >
                    Ask from chatbot
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Diagnosis;
