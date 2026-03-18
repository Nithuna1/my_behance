import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ✅ GET SINGLE SERVICE
export async function GET(req: Request) {
  await connectDB();

  try {
    const id = new URL(req.url).pathname.split("/").pop();

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

    return NextResponse.json(service);

  } catch (err) {
    console.error("GET ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE SERVICE
export async function PUT(req: Request) {
  await connectDB();

  try {
    const id = new URL(req.url).pathname.split("/").pop();

    console.log("SERVICE UPDATE ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // 🔹 HANDLE MULTIPLE IMAGES
    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        imageUrls.push(
          `data:${file.type};base64,${buffer.toString("base64")}`
        );
      }
    }

    // 🔹 HANDLE ARRAYS SAFELY
    const parseArray = (value: any) => {
      try {
        return value ? JSON.parse(value) : [];
      } catch {
        return [];
      }
    };

    const tags = parseArray(formData.get("tags"));
    const websites = parseArray(formData.get("websites"));
    const videos = parseArray(formData.get("videos"));

    // 🔹 BUILD UPDATE OBJECT
    const updateData: any = {
      title: formData.get("title"),
      tags,
      websites,
      videos,
    };

    // only update images if new ones uploaded
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
      updated,
    });

  } catch (err) {
    console.error("PUT ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}