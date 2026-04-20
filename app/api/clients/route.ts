import { connectDB } from "@/lib/mongodb";
import Client from "@/models/Client";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// ================= GET =================
export async function GET() {
  try {
    await connectDB();

    const clients = await Client.find().sort({ _id: -1 });

    return NextResponse.json(clients);

  } catch (error: any) {
    console.log("GET ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


// ================= POST =================
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("image") as File;

    let imageUrl = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        { folder: "clients" }
      );

      imageUrl = upload.secure_url;
    }

    const client = await Client.create({
      name: formData.get("name"),
      website: formData.get("website"),
      section: formData.get("section"),
      image: imageUrl,
    });

    return NextResponse.json({
      success: true,
      client,
    });

  } catch (error: any) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


// ================= PUT =================
export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Client ID is required" },
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

    const updateData: any = {
      name: formData.get("name"),
      website: formData.get("website"),
      section: formData.get("section"),
      image: existing.image, // keep old by default
    };

    const file = formData.get("image") as File;

    // upload new image if exists
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        { folder: "clients" }
      );

      updateData.image = upload.secure_url;
    }

    const updated = await Client.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      client: updated,
    });

  } catch (error: any) {
    console.log("PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update client",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// ================= DELETE =================
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Client ID is required" },
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

  } catch (error: any) {
    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete client",
        error: error.message,
      },
      { status: 500 }
    );
  }
}