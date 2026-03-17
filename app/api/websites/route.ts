import { connectDB } from "@/lib/mongodb";
import Website from "@/models/Website";
import { NextResponse } from "next/server";


// ✅ GET ALL WEBSITES
export async function GET() {
  try {
    await connectDB();

    const websites = await Website.find().sort({ _id: -1 });

    return NextResponse.json(websites);

  } catch (error: any) {
    console.log("GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// ✅ CREATE WEBSITE (WITH IMAGE UPLOAD)
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

    // ✅ CREATE WEBSITE
    const website = await Website.create({
      name: formData.get("name"),
      url: formData.get("url"),
      video: formData.get("video"),
      image: imageUrls[0] || "https://via.placeholder.com/100",
    });

    return NextResponse.json({
      success: true,
      website,
    });

  } catch (error: any) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create website",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// ✅ UPDATE WEBSITE
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Website ID is required" },
        { status: 400 }
      );
    }

    const updated = await Website.findByIdAndUpdate(id, data, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      website: updated,
    });

  } catch (error: any) {
    console.log("PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update website",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// ✅ DELETE WEBSITE
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Website ID is required" },
        { status: 400 }
      );
    }

    await Website.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Website deleted successfully",
    });

  } catch (error: any) {
    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete website",
        error: error.message,
      },
      { status: 500 }
    );
  }
}