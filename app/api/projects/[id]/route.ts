import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
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
// ✅ GET SINGLE PROJECT
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

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      project,
    });

  } catch (err) {
    console.error("GET PROJECT ERROR:", err);

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
      { folder: "projects" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};


// ==============================
// ✅ UPDATE PROJECT (CLOUDINARY)
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
    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    // 🔥 UPLOAD MULTIPLE IMAGES
    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await uploadToCloudinary(buffer);

        imageUrls.push(uploadResult.secure_url);
      }
    }

    const updateData: any = {
      title: formData.get("title"),
      author: formData.get("author"),
      year: formData.get("year"),
      category: formData.get("category"),
      description: formData.get("description"),
    };

    // ✅ ONLY UPDATE IMAGES IF NEW ONES PROVIDED
    if (imageUrls.length > 0) {
      updateData.image = imageUrls[0]; // cover image
      updateData.gallery = imageUrls;  // full gallery
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      project: updated,
    });

  } catch (err) {
    console.error("PUT PROJECT ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}