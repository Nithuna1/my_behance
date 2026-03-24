import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: String,

  // ✅ category should match your UI filters
  category: {
    type: [String], // keep array (good)
    required: true, // important
  },

  tags: [String],
  websites: [String],
  images: [String],
  videos: [String],
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);