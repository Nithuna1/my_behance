import { connectDB } from "@/lib/mongodb";
import App from "@/models/App";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


// ✅ GET SINGLE APP
export async function GET(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

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

    return NextResponse.json(app);

  } catch (err) {
    console.error("GET ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


// ✅ UPDATE APP
export async function PUT(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    console.log("PUT APP ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // ✅ HANDLE IMAGE
    const file = formData.get("image") as File | null;

    let imageUrl = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      imageUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
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