import { connectDB } from "@/lib/mongodb";
import App from "@/models/App";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";


// ==============================
// 🔧 GET ID HELPER
// ==============================
const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split("/").pop();
};


// ==============================
// ✅ GET SINGLE APP
// ==============================
export async function GET(req: Request) {
  await connectDB();

  try {
    const id = getId(req);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const app = await App.findById(id);

    if (!app) {
      return NextResponse.json(
        { success: false, message: "App not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      app,
    });

  } catch (err) {
    console.error("GET ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


// ==============================
// 🔥 CLOUDINARY UPLOAD FUNCTION
// ==============================
const uploadToCloudinary = async (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "apps" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};


// ==============================
// ✅ UPDATE APP (CLOUDINARY)
// ==============================
export async function PUT(req: Request) {
  await connectDB();

  try {
    const id = getId(req);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // 🔥 HANDLE IMAGE (UPLOAD TO CLOUDINARY)
    const file = formData.get("image") as File | null;

    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult: any = await uploadToCloudinary(buffer);

      imageUrl = uploadResult.secure_url;
    }

    // ✅ HANDLE FEATURES ARRAY
    let features: string[] = [];

    try {
      const raw = formData.get("features");
      if (raw) {
        features = JSON.parse(raw as string);
      }
    } catch (err) {
      console.log("Features parse error");
    }

    // ✅ UPDATE DATA
    const updateData: any = {
      title: formData.get("title"),
      fullDescription: formData.get("fullDescription"),
      bestFor: formData.get("bestFor"),
      features,
    };

    // only update image if new one uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updated = await App.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "App not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "App updated successfully",
      app: updated,
    });

  } catch (err) {
    console.error("PUT ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}