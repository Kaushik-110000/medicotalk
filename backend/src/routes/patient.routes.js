import { Router } from "express";

import {
  registerPatient,
  loginPatient,
  getPatient,
  logOutPatient,
} from "../controllers/patient.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerPatient);
router.route("/login").post(loginPatient);
router.route("/").get(verifyJWT, getPatient);
router.route("/logout").post(verifyJWT, logOutPatient);
export default router;
