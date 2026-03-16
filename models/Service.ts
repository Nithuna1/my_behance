import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  images: [String],
  videos: [String],
  websites: [String],
});

export default mongoose.models.Service ||
mongoose.model("Service", ServiceSchema);