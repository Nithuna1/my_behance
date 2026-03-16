import mongoose from "mongoose";

const AppSchema = new mongoose.Schema({
  title: String,
  image: String,
  fullDescription: String,
  features: [String],
  bestFor: String,
});

export default mongoose.models.App ||
mongoose.model("App", AppSchema);