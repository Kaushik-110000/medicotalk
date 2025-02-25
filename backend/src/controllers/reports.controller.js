import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ReportHistory } from "../models/reportsHistory.model.js";
import axios from "axios";
import {
  diagnoseByGemini,
  diagnosePrescreptionByGemini,
  diagnosebloodReportByGemini,
} from "../utils/GeminiDiagnose.js";
import fs from "fs";
import FormData from "form-data";

// Existing Tumor Diagnosis Function
const diagnoseTumour = asyncHandler(async (req, res) => {
  const patientId = req.patient._id;
  if (!patientId) {
    throw new ApiError(404, "You are not logged in ");
  }
  const reportLocalPath = req.files?.report?.[0]?.path;
  if (!reportLocalPath) {
    throw new ApiError(404, "Report not found");
  }

  const formData = new FormData();
  formData.append("file", fs.createReadStream(reportLocalPath));

  const diagnoseResponse = await axios.post(
    `${process.env.ML_URL}/predicttumor/tumor_model`,
    formData,
    { headers: formData.getHeaders() }
  );

  const result = await diagnoseByGemini(diagnoseResponse.data);

  const Report = await uploadOnCloudinary(reportLocalPath);
  await ReportHistory.create({
    category: "Tumor Problem",
    report: Report.url,
    modelResponse: diagnoseResponse.data.prediction,
    patient: new mongoose.Types.ObjectId(patientId),
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        result,
      },
      "Report diagnosed by both Ml model and gemini"
    )
  );
});

// COVID Diagnosis Function
const diagnoseCovid = asyncHandler(async (req, res) => {
  const patientId = req.patient._id;
  if (!patientId) {
    throw new ApiError(404, "You are not logged in");
  }
  const reportLocalPath = req.files?.report?.[0]?.path;
  if (!reportLocalPath) {
    throw new ApiError(404, "Report not found");
  }

  const formData = new FormData();
  formData.append("file", fs.createReadStream(reportLocalPath));

  const diagnoseResponse = await axios.post(
    `${process.env.ML_URL}/predictcovid/covid_model`,
    formData,
    { headers: formData.getHeaders() }
  );

  const result = await diagnoseByGemini(diagnoseResponse.data);

  const Report = await uploadOnCloudinary(reportLocalPath);
  await ReportHistory.create({
    category: "COVID-19",
    report: Report.url,
    modelResponse: diagnoseResponse.data.prediction,
    patient: new mongoose.Types.ObjectId(patientId),
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        result,
      },
      "COVID report diagnosed by both ML model and Gemini"
    )
  );
});

// Pneumonia Diagnosis Function
const diagnosePneumonia = asyncHandler(async (req, res) => {
  const patientId = req.patient._id;
  if (!patientId) {
    throw new ApiError(404, "You are not logged in");
  }
  const reportLocalPath = req.files?.report?.[0]?.path;
  if (!reportLocalPath) {
    throw new ApiError(404, "Report not found");
  }

  const formData = new FormData();
  formData.append("file", fs.createReadStream(reportLocalPath));

  const diagnoseResponse = await axios.post(
    `${process.env.ML_URL}/predictpneumonia/pneumonia_model`,
    formData,
    { headers: formData.getHeaders() }
  );

  const result = await diagnoseByGemini(diagnoseResponse.data);

  const Report = await uploadOnCloudinary(reportLocalPath);
  await ReportHistory.create({
    category: "Pneumonia",
    report: Report.url,
    modelResponse: diagnoseResponse.data.prediction,
    patient: new mongoose.Types.ObjectId(patientId),
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        result,
      },
      "Pneumonia report diagnosed by both ML model and Gemini"
    )
  );
});

// Blood Report Analysis Function
const analyzeBloodReport = asyncHandler(async (req, res) => {
  const patientId = req.patient._id;
  if (!patientId) {
    throw new ApiError(404, "You are not logged in");
  }
  const reportLocalPath = req.files?.report?.[0]?.path;
  if (!reportLocalPath) {
    throw new ApiError(404, "Report not found");
  }

  const formData = new FormData();
  formData.append("file", fs.createReadStream(reportLocalPath));

  const analyzeResponse = await axios.post(
    `${process.env.ML_URL}/bloodreport/read`,
    formData,
    { headers: formData.getHeaders() }
  );

  const result = await diagnosebloodReportByGemini(analyzeResponse.data);

  const Report = await uploadOnCloudinary(reportLocalPath);
  await ReportHistory.create({
    category: "Blood Report",
    report: Report.url,
    modelResponse: result,
    patient: new mongoose.Types.ObjectId(patientId),
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        result,
      },
      "Blood report analyzed by both ML model and Gemini"
    )
  );
});

// Prescription Reading Function
const readPrescription = asyncHandler(async (req, res) => {
  const patientId = req.patient._id;
  if (!patientId) {
    throw new ApiError(404, "You are not logged in");
  }
  const prescriptionLocalPath = req.files?.report?.[0]?.path;
  if (!prescriptionLocalPath) {
    throw new ApiError(404, "Prescription not found");
  }

  const formData = new FormData();
  formData.append("file", fs.createReadStream(prescriptionLocalPath));

  const prescriptionResponse = await axios.post(
    `${process.env.ML_URL}/doctorprescription/read`,
    formData,
    { headers: formData.getHeaders() }
  );

  const result = await diagnosePrescreptionByGemini(prescriptionResponse.data);

  const Prescription = await uploadOnCloudinary(prescriptionLocalPath);
  await ReportHistory.create({
    category: "Prescription",
    report: Prescription.url,
    modelResponse: result,
    patient: new mongoose.Types.ObjectId(patientId),
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        result,
      },
      "Prescription analyzed by both ML model and Gemini"
    )
  );
});

export {
  diagnoseTumour,
  diagnoseCovid,
  diagnosePneumonia,
  analyzeBloodReport,
  readPrescription,
};
