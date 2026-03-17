import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// ✅ GET ALL PROJECTS
export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ _id: -1 });

    return NextResponse.json(projects);

  } catch (error: any) {
    console.log("GET ERROR FULL:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ✅ CREATE PROJECT (UPDATED FOR MULTIPLE IMAGES)
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    // ✅ GET ALL IMAGES
    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    // ✅ CONVERT EACH IMAGE TO BASE64
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        imageUrls.push(base64);
      }
    }

    const project = await Project.create({
      title: formData.get("title"),
      author: formData.get("author"),
      year: formData.get("year"),
      category: formData.get("category"),
      description: formData.get("description"),

      // ✅ PRIMARY IMAGE
      image: imageUrls[0] || "https://via.placeholder.com/100",

      // ✅ ALL IMAGES
      gallery: imageUrls,
    });

    return NextResponse.json({ success: true, project });

  } catch (error) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

// ✅ DELETE PROJECT
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const id = body?.id;

    // ✅ Validate ID
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    // ✅ Check if project exists
    const existing = await Project.findById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    // ✅ Delete project
    await Project.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error: any) {
    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}