import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";

// ==============================
// 🔧 GET ID HELPER
// ==============================
const getId = (req: Request) => {
  return new URL(req.url).pathname.split("/").pop();
};


// ==============================
// ✅ GET SINGLE SERVICE
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

    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      service,
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
      { folder: "services" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};


// ==============================
// ✅ UPDATE SERVICE (CLOUDINARY)
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

    // 🔥 HANDLE MULTIPLE IMAGES (UPLOAD TO CLOUDINARY)
    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await uploadToCloudinary(buffer);

        imageUrls.push(uploadResult.secure_url);
      }
    }

    // 🔹 SAFE ARRAY PARSER
    const parseArray = (value: any) => {
      try {
        return value ? JSON.parse(value as string) : [];
      } catch {
        return [];
      }
    };

    const tags = parseArray(formData.get("tags"));
    const websites = parseArray(formData.get("websites"));
    const videos = parseArray(formData.get("videos"));

    // 🔹 UPDATE DATA
    const updateData: any = {
      title: formData.get("title"),
      tags,
      websites,
      videos,
    };

    // only update images if new uploaded
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const updated = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
      service: updated,
    });

  } catch (err) {
    console.error("PUT ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}