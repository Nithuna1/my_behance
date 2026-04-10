import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// ================= CLOUDINARY =================
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

// ================= GET =================
export async function GET() {
  await connectDB();
  const clients = await Client.find().sort({ createdAt: -1 });
  return NextResponse.json(clients);
}

// ================= POST =================
export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();

  const file = formData.get("image") as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const upload = await uploadToCloudinary(buffer);

  const client = await Client.create({
    name: formData.get("name"),
    review: formData.get("review"),
    section: formData.get("section"),
    image: upload.secure_url,
  });

  return NextResponse.json(client);
}

// ================= PUT =================
export async function PUT(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const id = formData.get("id");

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
export async function DELETE(req: Request) {
  await connectDB();

  const { id } = await req.json();

  await Client.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}