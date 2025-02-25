import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "console";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const diagnoseByGemini = async (report) => {
  try {
    const prediction = report.prediction;
    const probability = report.probability;

    let probabilityNote = "";
    probabilityNote = `Despite the prediction, ask some symotoms too to assure`;

    const prompt = `
    You are an advanced medical diagnostic and advisory system designed to provide comprehensive insights based on medical report predictions. Your goal is to offer clear, actionable information to users, bridging the gap between automated analysis and informed healthcare decisions.

    Medical Report Analysis:

    -   **Predicted Condition:** ${prediction}
    -   **Probability Note:** ${probabilityNote}

    Detailed Instructions:
    work completely on the data and you may ask more symptoms from user
    1.  **Comprehensive Diagnosis Explanation:**
        * Provide a detailed, yet understandable, explanation of the predicted condition.
        * Describe the potential symptoms, causes, and mechanisms associated with the condition.
        * If the prediction suggests a spectrum of related conditions, outline the possibilities.
    2.  **Personalized Prescription and Management Strategies:**
        * Based on the prediction, offer specific, practical advice for managing the predicted condition.
        * If applicable, suggest over-the-counter medications, lifestyle adjustments, dietary recommendations, and home care strategies.
        * Clearly differentiate between immediate, short-term relief measures and long-term management plans.
        * Emphasize when self-management is appropriate and when professional medical intervention is crucial.
    3.  **Preventative Measures and Health Optimization:**
        * Provide advice on preventative measures to reduce the risk of recurrence or progression of the predicted condition.
        * Offer general health optimization strategies, including stress management, sleep hygiene, and physical activity recommendations.
        * If the prediction indicates a possible chronic illness, offer guidance to the user on how to best manage their health in the long term.
    4.  **Specialized Medical Referral and Follow-Up Guidance:**
        * Recommend a specific type of medical specialist for further evaluation and treatment.
        * Provide guidance on what to expect during a consultation with the specialist.
        * If possible, provide a list of potential tests that the specialist may order.
        * Emphasize the importance of timely follow-up and adherence to recommended treatment plans.
    5.  **Clarity, Empathy, and User-Centric Communication:**
        * Use clear, concise, and accessible language, avoiding overly technical jargon.
        * Acknowledge the user's potential concerns and anxieties, providing empathetic and reassuring communication.
        * If the probability is low, be sure to reinforce that further testing is required.
        * Structure the response in a logical and easy-to-follow format, using bullet points or numbered lists where appropriate.

    Response:
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error in diagnoseByGemini:", error);
    return "Error fetching the report and generating diagnosis.";
  }
};

const diagnosebloodReportByGemini = async (report) => {
  try {
    const bloodReportText = report.text || "";
    // console.log("hero", report.text);
    const prompt = `
    You are an advanced medical diagnostic assistant specializing in blood report analysis. You will analyze the given blood test report and extract useful medical insights. 
    The text data from the report might have OCR errors, so interpret the information carefully, making reasonable assumptions where needed.
    Whatever data is given , interpret it according to you and dont give error instead give any predicition only
    Blood Report Data:
    ${bloodReportText}
    
    Detailed Analysis:
    1. Identify key components of the blood report (such as hemoglobin, WBC count, RBC count, platelets, glucose levels, cholesterol levels, liver function markers, kidney function markers, and any other relevant values).
    2. Compare values against standard medical ranges and indicate possible concerns or normal findings.
    3. If any values suggest potential health risks, provide possible conditions, symptoms, and risk factors associated with those findings.
    4. Suggest lifestyle changes, dietary recommendations, and any precautions the user should take to improve their health.
    5. Recommend whether further medical consultation is needed and specify which specialist should be approached (e.g., hematologist, endocrinologist, cardiologist, etc.).
    6. If the report lacks clarity due to OCR errors, provide possible interpretations and guide the user on verifying values from their original document.
    7. Structure the response for easy readability with proper headings, bullet points, and clear explanations.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error in diagnosebloodReportByGemini:", error);
    return "Error analyzing the blood report.";
  }
};

const diagnosePrescreptionByGemini = async (report) => {
  try {
    const prescriptionText = report.text || "";
    // console.log("hero", prescriptionText);
    const prompt = `
    You are a medical assistant specializing in analyzing prescriptions. Given the extracted prescription text (which may contain OCR errors), analyze the contents and provide useful insights.
    You are an advanced medical diagnostic assistant specializing in blood report analysis. You will analyze the given blood test report and extract useful medical insights. 
    The text data from the report might have OCR errors, so interpret the information carefully, making reasonable assumptions where needed.
    Prescription Data:
    ${prescriptionText}
    Whatever data is given , interpret it according to you and dont give error instead give any predicition only
    
    Analysis Steps:
    1. Identify the prescribed medications, their active ingredients, and their common uses.
    2. Provide detailed dosage instructions if clearly mentioned, and highlight any possible ambiguities due to OCR errors.
    3. Explain the purpose of each medication, including potential side effects, drug interactions, and contraindications.
    4. If available, extract any doctor's recommendations related to the prescription, including special instructions like dietary restrictions or timing of medications.
    5. Offer general advice regarding adherence to the prescription, potential lifestyle modifications, and warning signs that require medical attention.
    6. If the OCR-generated text has errors, infer possible corrections and suggest ways for the user to verify the prescription details.
    7. Ensure that the response is structured and easy to understand, helping the user make informed decisions. Use clear formatting, bullet points, and logical sections for better comprehension.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error in diagnosePrescreptionByGemini:", error);
    return "Error analyzing the prescription.";
  }
};

export {
  diagnoseByGemini,
  diagnosePrescreptionByGemini,
  diagnosebloodReportByGemini,
};
