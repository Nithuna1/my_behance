import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import cloudinary from "@/lib/cloudinary";

// CLOUDINARY
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

// ================= GET SINGLE =================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const client = await Client.findById(id);

  return NextResponse.json(client);
}

// ================= UPDATE =================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;

  const formData = await req.formData();

  const updateData: any = {
    name: formData.get("name"),
    review: formData.get("review"),
    section: formData.get("section"),
  };

  const file = formData.get("image") as File;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await uploadToCloudinary(buffer);
    updateData.image = upload.secure_url;
  }

  const updated = await Client.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return NextResponse.json(updated);
}

// ================= DELETE =================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Client.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}