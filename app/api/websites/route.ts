import { connectDB } from "@/lib/mongodb";
import Website from "@/models/Website";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


// ✅ GET ALL WEBSITES
export async function GET() {
  try {
    await connectDB();

    const websites = await Website.find().sort({ _id: -1 });

  return NextResponse.json({ websites });

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

    // ✅ GET JSON (NOT formData)
    const body = await req.json();

    const website = await Website.create({
      name: body.name,
      url: body.url,
      image: body.image,
      images: body.images,
      video: body.video,
    });

    return NextResponse.json({
      success: true,
      website,
    });

  } catch (error: any) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
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