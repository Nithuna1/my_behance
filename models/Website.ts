import mongoose from "mongoose";

const WebsiteSchema = new mongoose.Schema({
  name: String,
  url: String,
  image: String,
  video: String,
});

export default mongoose.models.Website ||  
mongoose.model("Website", WebsiteSchema);