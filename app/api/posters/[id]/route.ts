import { connectDB } from "@/lib/mongodb";
import Poster from "@/models/Poster";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";


// ==============================
// 🔧 HELPER: GET ID
// ==============================
const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split("/").pop();
};


// ==============================
// 🔥 CLOUDINARY UPLOAD
// ==============================
const uploadToCloudinary = async (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "posters" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};


// ==============================
// 🔥 DELETE OLD IMAGE
// ==============================
const deleteFromCloudinary = async (url: string) => {
  try {
    const parts = url.split("/");
    const fileName = parts.pop()?.split(".")[0];

    if (fileName) {
      await cloudinary.uploader.destroy(`posters/${fileName}`);
    }
  } catch (err) {
    console.log("Cloudinary delete error:", err);
  }
};


// ==============================
// ✅ GET SINGLE POSTER
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

    const poster = await Poster.findById(id);

    if (!poster) {
      return NextResponse.json(
        { success: false, message: "Poster not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      poster,
    });

  } catch (err) {
    console.error("GET POSTER ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


// ==============================
// ✅ UPDATE POSTER (CLOUDINARY)
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

    const existing = await Poster.findById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Poster not found" },
        { status: 404 }
      );
    }

    // ==============================
    // 🔥 HANDLE IMAGE UPLOAD
    // ==============================
    const file = formData.get("image") as File | null;
    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult: any = await uploadToCloudinary(buffer);

      imageUrl = uploadResult.secure_url;

      // 🔥 DELETE OLD IMAGE FROM CLOUDINARY
      if (existing.image && existing.image.includes("cloudinary")) {
        await deleteFromCloudinary(existing.image);
      }
    }

    // ==============================
    // 🔥 UPDATE DATA
    // ==============================
    const updateData: any = {
      title: formData.get("title"),
      category: formData.get("category"),
    };

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updated = await Poster.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Poster updated successfully",
      poster: updated,
    });

  } catch (err) {
    console.error("PUT POSTER ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}