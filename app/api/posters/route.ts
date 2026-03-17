import { connectDB } from "@/lib/mongodb";
import Poster from "@/models/Poster";
import { NextResponse } from "next/server";


// ✅ GET ALL POSTERS
export async function GET() {
  try {
    await connectDB();

    const posters = await Poster.find().sort({ _id: -1 });

    return NextResponse.json(posters);

  } catch (error: any) {
    console.log("GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// ✅ CREATE POSTER (WITH IMAGE UPLOAD)
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    // ✅ GET FILES
    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        imageUrls.push(base64);
      }
    }

    // ✅ CREATE POSTER
    const poster = await Poster.create({
      title: formData.get("title"),
      category: formData.get("category"),
      image: imageUrls[0] || "https://via.placeholder.com/100",
    });

    return NextResponse.json({
      success: true,
      poster,
    });

  } catch (error: any) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create poster",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// ✅ UPDATE POSTER
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Poster ID is required" },
        { status: 400 }
      );
    }

    const updated = await Poster.findByIdAndUpdate(id, data, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      poster: updated,
    });

  } catch (error: any) {
    console.log("PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update poster",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// ✅ DELETE POSTER
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Poster ID is required" },
        { status: 400 }
      );
    }

    await Poster.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Poster deleted successfully",
    });

  } catch (error: any) {
    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete poster",
        error: error.message,
      },
      { status: 500 }
    );
  }
}