import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  diagnoseTumour,
  diagnoseCovid,
  diagnosePneumonia,
  analyzeBloodReport,
  readPrescription,
} from "../controllers/reports.controller.js";

const router = Router();

// Tumor Diagnosis Route
router.route("/tumourtest").post(
  upload.fields([{ name: "report", maxCount: 1 }]),
  verifyJWT,
  diagnoseTumour
);

// COVID Diagnosis Route
router.route("/covidtest").post(
  upload.fields([{ name: "report", maxCount: 1 }]),
  verifyJWT,
  diagnoseCovid
);

// Pneumonia Diagnosis Route
router.route("/pneumoniatest").post(
  upload.fields([{ name: "report", maxCount: 1 }]),
  verifyJWT,
  diagnosePneumonia
);

// Blood Report Analysis Route
router.route("/bloodreport").post(
  upload.fields([{ name: "report", maxCount: 1 }]),
  verifyJWT,
  analyzeBloodReport
);

// Prescription Reading Route
router.route("/prescription").post(
  upload.fields([{ name: "report", maxCount: 1 }]),
  verifyJWT,
  readPrescription
);

export default router;