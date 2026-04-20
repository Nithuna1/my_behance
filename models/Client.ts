import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    website: String,
    section: {
      type: String,
      enum: ["front", "back"],
      default: "front",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema);