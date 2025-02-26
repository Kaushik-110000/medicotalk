import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Patient } from "../models/patient.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import ms from "ms";

const registerPatient = asyncHandler(async (req, res) => {
  const { fullName, age, weight, height, gender } = req.body;

  if (![fullName, age, weight, height, gender].every((field) => field)) {
    throw new ApiError(400, "All fields are required");
  }

  const patientCount = await Patient.countDocuments();
  const patientID = `PAT-${patientCount + 1}`; // Example format: PAT-1, PAT-2, ...

  const newPatient = new Patient({
    fullName,
    age,
    weight,
    height,
    gender,
    patientID,
  });

  await newPatient.save();

  res
    .status(201)
    .json(new ApiResponse(201, "Patient registered successfully", newPatient));
});

const loginPatient = asyncHandler(async (req, res) => {
  const { patientID } = req.body;

  if (!patientID) {
    throw new ApiError(400, "Patient ID is required");
  }

  // Corrected Query Syntax
  const patient = await Patient.findOne({ patientID });

  if (!patient) {
    throw new ApiError(404, "Invalid patient ID");
  }

  // Generate JWT Token
  const token = jwt.sign({ _id: patient._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY, // Example: "10d"
  });

  // Convert Expiry Time (e.g., "10d" -> milliseconds)
  const expiryTime = Date.now() + ms(process.env.TOKEN_EXPIRY);

  // Save Token to Database
  patient.token = token;
  patient.tokenValidity = expiryTime;
  await patient.save();

  // Set Cookie Options
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: ms(process.env.TOKEN_EXPIRY), // Convert "10d" to milliseconds
  };

  // Set Cookie
  res.cookie("token", token, options);

  return res
    .status(200)
    .json(new ApiResponse(200, patient, "Login successful"));
});

const getPatient = asyncHandler(async (req, res) => {
  // console.log(req.patient);
  const patientId = req.patient._id;
  // console.log("pp", patientId);
  if (!patientId) {
    throw new ApiError(404, "You are not inside patient id ");
  }

  const result = await Patient.findById(new mongoose.Types.ObjectId(patientId));
  if (!result) {
    throw new ApiError(404, "Error in fetching the patient");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Patient details fetched"));
});

const logOutPatient = asyncHandler(async (req, res) => {
  const patientId = req.patient._id;
  if (!patientId) {
    throw new ApiError(404, "You are not inside patient id ");
  }
  await Patient.findByIdAndUpdate(
    new mongoose.Types.ObjectId(patientId),
    {
      $unset: {
        token: 1,
        tokenValidity: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, {}, "Logged out user"));
});
export { registerPatient, loginPatient, getPatient, logOutPatient };
