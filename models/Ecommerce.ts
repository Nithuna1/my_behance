import mongoose from "mongoose";

const EcommerceSchema = new mongoose.Schema({
  image: String,
  video: String,
  website: String,
}, { timestamps: true });

export default mongoose.models.Ecommerce ||
  mongoose.model("Ecommerce", EcommerceSchema);