import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


// ✅ GET ALL PROJECTS
export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find().sort({ _id: -1 });

    return NextResponse.json(projects);

  } catch (error: any) {
    console.log("GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// ✅ CREATE PROJECT (🔥 CLOUDINARY VERSION)
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        {
          folder: "projects",
          resource_type: "image",
          transformation: [
            { quality: "auto", fetch_format: "auto" },
          ],
        }
      );

      imageUrls.push(upload.secure_url);
    }

    const project = await Project.create({
      title: formData.get("title"),
      author: formData.get("author"),
      year: formData.get("year"),
      category: formData.get("category"),
      description: formData.get("description"),

      image: imageUrls[0] || "/no-image.png",
      gallery: imageUrls,
    });

    return NextResponse.json({
      success: true,
      project,
    });

  } catch (error: any) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// ✅ DELETE PROJECT
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID required" },
        { status: 400 }
      );
    }

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