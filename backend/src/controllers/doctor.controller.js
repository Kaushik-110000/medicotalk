import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ReportHistory } from "../models/reportsHistory.model.js";
import { Patient } from "../models/patient.model.js";
import { PatientHistory } from "../models/patientHistory.model.js";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "console";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const dignoser = asyncHandler(async (req, res) => {
  const patientId = req.patient._id;
  if (!patientId) {
    throw new ApiError(404, "You are not inside patient id");
  }

  const genricPrompt = "Hello, can you advise me on health?";

  // Ensure req.body is properly handled
  const prompt = req.body?.prompt || genricPrompt;

  const patientHistory = await PatientHistory.findOne({
    patient: new mongoose.Types.ObjectId(patientId),
  });

  if (!patientHistory) {
    PatientHistory.create({
      content: [prompt],
      patient: new mongoose.Types.ObjectId(patientId),
    });
  } else {
    if (prompt !== genricPrompt) {
      patientHistory.content.push(prompt);
      await patientHistory.save();
    }
  }

  const pastPatientSearches =
    patientHistory?.content?.join(", ") || "No past searches.";

  const pastPatientReports = await ReportHistory.aggregate([
    {
      $match: {
        patient: new mongoose.Types.ObjectId(patientId),
      },
    },
    {
      $project: {
        category: 1,
        modelResponse: 1,
        createdAt: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  // Format reports into a readable string
  const formattedReports =
    pastPatientReports
      .map(
        (report) =>
          `Category: ${report.category}, Response: ${report.modelResponse}, Date: ${report.createdAt}`
      )
      .join("\n") || "No past reports.";

  let result = "";

  const sentPrompt = `
  You are an AI assistant in a diagnosis lab. Your role is to help lab assistants analyze a patient's medical condition based on their input, past searches, and diagnostic reports. Follow these priority rules when responding:
  
  1**If the user sends a casual greeting (e.g., "Hi", "Hello", "What's up?") or an unrelated message:**
     - DO NOT respond casually.
     - Instead, refer to past medical history and ask a **relevant health-related question** based on previous interactions.
     - Example: 
       - If the patient has a history of diabetes, ask: *"How have your blood sugar levels been recently?"*
       - If no history is available, ask: *"Could you describe any recent symptoms or concerns?"*
  
  2 **If the user describes a condition that is NOT strongly linked to past reports or searches:**
     - IGNORE past interactions and focus **entirely on the current symptoms**.
     - Provide a **detailed medical analysis** based on symptoms.
     - Ask clarifying questions if needed.
  
  3 **If the query is related to past reports and medical history:**
     - ANALYZE the connection between past reports and current symptoms.
     - Provide a **comparative analysis** (e.g., "Your new symptoms might indicate a worsening/improvement of your previous condition").
     - Suggest whether the patient should take further tests or revisit previous diagnoses.
  
  ---
  
  ### **User's Query:**
  "${prompt}"
  
  ### **Past Searches:**
  ${pastPatientSearches}
  
  ### **Past Medical Reports Summary:**
  ${formattedReports}
  
  ---
  
 **Your task:** 
  - First, identify which of the three cases above applies. never reply the case , its just for your reference
  - Then, generate a **concise, professional, and medically sound response**.
  - If necessary, suggest **further tests or specialist consultation**.
  
  **Focus on diagnosis assistance. Provide structured, easy-to-understand medical guidance.**
  `;

  // console.log(sentPrompt);

  try {
    const response = await model.generateContent(sentPrompt);
    result = response.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    result = "I'm sorry, but I couldn't process your request at the moment.";
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { output: result },
        "Response generated successfully."
      )
    );
});

export { dignoser };
