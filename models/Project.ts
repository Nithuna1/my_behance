import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  year: String,
  category: String,
  description: String,
  gallery: [String],
});

export default mongoose.models.Project ||
mongoose.model("Project", ProjectSchema);