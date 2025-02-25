import mongoose, { Schema } from "mongoose";

const patientHistorySchema = new Schema({
  content: {
    type: [String],
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
});

export const PatientHistory = mongoose.model(
  "PatientHistory",
  patientHistorySchema
);
