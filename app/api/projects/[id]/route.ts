import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


// 🔧 Helper: clean + validate ID safely
const getValidObjectId = (rawId: any) => {
  let id = rawId;

  if (Array.isArray(id)) {
    id = id[0];
  }

  id = String(id).trim();

  // ❌ REMOVE THIS (CAUSE OF BUG)
  // id = id.replace(/[^a-fA-F0-9]/g, "");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return new mongoose.Types.ObjectId(id);
};


// ✅ GET SINGLE PROJECT
export async function GET(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    console.log("FINAL ID:", id);

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

    return NextResponse.json(project);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}


// ✅ UPDATE PROJECT
export async function PUT(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // ✅ SAME AS GET

    console.log("PUT ID:", id); // 🔍 DEBUG

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        imageUrls.push(
          `data:${file.type};base64,${buffer.toString("base64")}`
        );
      }
    }

    const updated = await Project.findByIdAndUpdate(
      id, // ✅ DIRECT STRING (NO ObjectId needed)
      {
        title: formData.get("title"),
        author: formData.get("author"),
        year: formData.get("year"),
        category: formData.get("category"),
        description: formData.get("description"),

        ...(imageUrls.length > 0 && {
          image: imageUrls[0],
          gallery: imageUrls,
        }),
      },
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
  data: updated,
});

  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}