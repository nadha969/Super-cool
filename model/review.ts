
import mongoose, { Schema, models, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    productSlug: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

export default models.Review ||
  model("Review", ReviewSchema);
