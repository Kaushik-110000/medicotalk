import mongoose, { Schema } from "mongoose";
const reportHistorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    report: {
      type: String,
    },
    modelResponse: {
      type: String,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ReportHistory = mongoose.model(
  "ReportHistory",
  reportHistorySchema
);
