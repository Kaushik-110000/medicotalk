import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Patient } from "../models/patient.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "").trim(); // Fixed "Bearer" replacement
    console.log(token);
    if (!token) throw new ApiError(403, "Unauthorized request");

    // Verify token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("dd", decodedToken);
    // Ensure token contains an ID
    if (!decodedToken?._id) throw new ApiError(401, "Invalid access token");

    // Fetch patient details
    const patient = await Patient.findById(decodedToken._id);

    if (!patient) throw new ApiError(401, "Patient not found");

    // Attach patient to request object
    req.patient = decodedToken;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid token");
  }
});
