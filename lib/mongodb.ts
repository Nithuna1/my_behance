import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected ✅");
      return;
    }

    const uri = process.env.MONGODB_URI; 

    console.log("MONGO URI:", uri); 

    if (!uri) {
      throw new Error("MONGODB_URI is missing ❌");
    }

    await mongoose.connect(uri);

    console.log("MongoDB Connected ✅");

  } catch (error) {
    console.log("MongoDB ERROR ❌:", error);
    throw error;
  }
}