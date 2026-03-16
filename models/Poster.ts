import mongoose from "mongoose";

const PosterSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Poster ||
mongoose.model("Poster", PosterSchema);