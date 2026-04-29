import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    website: String,
    showOnHome: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Clear cached model to ensure schema updates apply
if (mongoose.models.Client) {
  delete mongoose.models.Client;
}

export default mongoose.model("Client", ClientSchema);