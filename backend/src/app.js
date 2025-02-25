import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ limit: "20kb", extended: true }));
app.use(express.static("public"));

app.use(cookieParser());
import healthcheckRouter from "./routes/healthcheck.routes.js";
import patientRouter from "./routes/patient.routes.js";
import reportRouter from "./routes/diagnose.routes.js";
import doctorRouter from "./routes/interactiveDiagnoser.router.js";
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/reports", reportRouter);
app.use("/api/v1/dignose", doctorRouter);
export { app };
