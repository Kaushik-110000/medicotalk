import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    patientID: {
      type: String,
      unique: true, // Ensure uniqueness
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    height: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // Standard values
    },
    token: {
      type: String,
      default: "",
    },
    tokenValidity: {
      type: Date,
    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt fields
  }
);

export const Patient = mongoose.model("Patient", patientSchema);
