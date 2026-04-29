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
    showOnHome: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Client ||
  mongoose.model("Client", ClientSchema);