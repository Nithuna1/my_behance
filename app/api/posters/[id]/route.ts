import { connectDB } from "@/lib/mongodb";
import Poster from "@/models/Poster";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// 🔧 Helper: extract ID safely
const getId = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split("/").pop();
};



// ✅ GET SINGLE POSTER
export async function GET(req: Request) {
  await connectDB();

  try {
    const id = getId(req);

    console.log("GET POSTER ID:", id);

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

    return NextResponse.json(poster);

  } catch (err) {
    console.error("GET POSTER ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}



// ✅ UPDATE POSTER
export async function PUT(req: Request) {
  await connectDB();

  try {
    const id = getId(req);

    console.log("PUT POSTER ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // 🔹 HANDLE IMAGE
    const file = formData.get("image") as File | null;

    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      imageUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    // 🔹 UPDATE DATA
    const updateData: any = {
      title: formData.get("title"),
      category: formData.get("category"),
    };

    // update image only if new uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updated = await Poster.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Poster not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Poster updated successfully",
      updated,
    });

  } catch (err) {
    console.error("PUT POSTER ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}