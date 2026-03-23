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

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const url = formData.get("url") as string;

    const videoFile = formData.get("video") as File | null;
    const imageFiles = formData.getAll("images") as File[];

    let imageUrls: string[] = [];
    let videoUrl = "";

    // ✅ Upload images
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });

        imageUrls.push(result.secure_url);
      }
    }

    // ✅ Upload video
    if (videoFile && videoFile.size > 0) {
      const bytes = await videoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "video" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      videoUrl = result.secure_url;
    }

    const website = await Website.create({
      name,
      url,
      image: imageUrls[0] || "",
      images: imageUrls,
      video: videoUrl,
    });

    return NextResponse.json({ success: true, website });

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