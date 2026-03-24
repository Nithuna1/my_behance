import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: String,

  
  category: {
    type: [String], 
    required: true, 
  },

  tags: [String],
  websites: [String],
  images: [String],
  videos: [String],
});

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);