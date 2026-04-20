import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";
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
// 🔥 CLOUDINARY UPLOAD
// ==============================
const uploadToCloudinary = async (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "clients" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};


// ==============================
// ✅ GET SINGLE CLIENT
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

    const client = await Client.findById(id);

    if (!client) {
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      client,
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
// ✅ UPDATE CLIENT
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

    const existing = await Client.findById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    // 🔥 HANDLE IMAGE
    const file = formData.get("image") as File | null;

    let imageUrl = existing.image; // keep old image by default

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult: any = await uploadToCloudinary(buffer);
      imageUrl = uploadResult.secure_url;
    }

    // ✅ UPDATE DATA
    const updateData = {
      name: formData.get("name"),
      website: formData.get("website"),
      section: formData.get("section"),
      image: imageUrl,
    };

    const updated = await Client.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Client updated successfully",
      client: updated,
    });

  } catch (err) {
    console.error("PUT ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


// ==============================
// ✅ DELETE CLIENT
// ==============================
export async function DELETE(req: Request) {
  await connectDB();

  try {
    const id = getId(req);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const existing = await Client.findById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );
    }

    await Client.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Client deleted successfully",
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}