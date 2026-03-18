import { connectDB } from "@/lib/mongodb";
import Website from "@/models/Website";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// 🔧 Helper: get ID safely
const getIdFromReq = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.split("/").pop();
};


// ✅ GET SINGLE WEBSITE
export async function GET(req: Request) {
  await connectDB();

  try {
    const id = getIdFromReq(req);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const website = await Website.findById(id);

    if (!website) {
      return NextResponse.json(
        { success: false, message: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(website);

  } catch (err) {
    console.error("GET WEBSITE ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


// ✅ UPDATE WEBSITE
export async function PUT(req: Request) {
  await connectDB();

  try {
    const id = getIdFromReq(req);

    console.log("WEBSITE UPDATE ID:", id);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    // 🔹 IMAGE HANDLING
    const file = formData.get("image") as File | null;

    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      imageUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    // 🔹 UPDATE DATA
    const updateData: any = {
      name: formData.get("name"),
      url: formData.get("url"),
      video: formData.get("video"),
    };

    // only update image if new one uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updated = await Website.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Website not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Website updated successfully",
      updated,
    });

  } catch (err) {
    console.error("PUT WEBSITE ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}