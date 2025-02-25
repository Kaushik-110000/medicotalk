import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { dignoser } from "../controllers/doctor.controller.js";
const router = Router();
router.route("/").post(verifyJWT,dignoser);
export default router;
