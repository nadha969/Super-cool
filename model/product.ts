import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },

    image: String,

    description: {
      paragraph1: String,
      paragraph2: String,
      bullets: [String],
    },

    specs: {
      model: { type: String },
      btu: { type: String }
    },

    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);