import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: String,

  // ❌ REMOVE THIS
  // type: String,

  // ✅ ADD THIS
  category: {
    type: [String], // array
    default: ["service"],
  },

  tags: [String],
  websites: [String],
  images: [String],
  videos: [String],
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);