import React, { useState } from "react";
import doctorService from "../Backend/doctor.config.js";
import errorTeller from "../Backend/errorTeller.js";
import { FiSend, FiUser, FiMessageSquare } from "react-icons/fi";

function DiagnosisChatBot() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    "Diagnosis ChatBot: You may ask about the medical details of patient?",
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setError("");
    setLoading(true);
    const newHistory = [...chatHistory, `You: ${input}`];

    try {
      const response = await doctorService.getDiagnosisStatement({
        prompt: input,
      });
      newHistory.push(`Diagnosis ChatBot: ${response.data.data.output}`);
    } catch (error) {
      newHistory.push(`Error: ${errorTeller(error)}`);
    }

    setChatHistory(newHistory);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {/* Header */}
      <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center pb-4 mb-1">
        <FiMessageSquare className="mr-2 text-xl" />
        <h1 className="text-xl font-semibold">Medical Diagnosis Assistant</h1>
      </div>

      {/* Chat Display Section */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-lg overflow-y-auto pb-4 mb-1 border border-gray-200">
        {chatHistory.map((msg, index) => {
          const isUser = msg.startsWith("You:");
          const messageContent = msg.replace(/^(You|Diagnosis ChatBot): /, "");

          return (
            <div
              key={index}
              className={`flex ${
                isUser ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-3/4 p-3 rounded-2xl ${
                  isUser
                    ? "bg-blue-100 text-blue-900 ml-10"
                    : "bg-green-100 text-green-900 mr-10"
                }`}
              >
                <div className="flex items-center mb-1">
                  <span
                    className={`inline-block mr-2 ${
                      isUser ? "text-blue-500" : "text-green-500"
                    }`}
                  >
                    {isUser ? <FiUser /> : <FiMessageSquare />}
                  </span>
                  <span className="font-medium text-sm">
                    {isUser ? "You" : "Medical Assistant"}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-gray-800">
                  {messageContent}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms or ask a question about your last report"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <FiSend className="text-white text-xl" />
            )}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <span className="mr-1">⚠️</span>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default DiagnosisChatBot;
