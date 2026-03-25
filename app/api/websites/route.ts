import { connectDB } from "@/lib/mongodb";
import Website from "@/models/Website";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


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


// ✅ CREATE WEBSITE (🔥 CLOUDINARY VERSION)
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const url = formData.get("url");

    const imageFiles = formData.getAll("images") as File[];
    const videoFile = formData.get("video") as File;

    let imageUrls: string[] = [];

    // ✅ UPLOAD IMAGES
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await cloudinary.uploader.upload(
          `data:${file.type};base64,${buffer.toString("base64")}`,
          {
            folder: "websites/images",
          }
        );

        imageUrls.push(upload.secure_url);
      }
    }

    // ✅ UPLOAD VIDEO
    let videoUrl = "";

    if (videoFile && videoFile.size > 0) {
      const bytes = await videoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await cloudinary.uploader.upload(
        `data:${videoFile.type};base64,${buffer.toString("base64")}`,
        {
          resource_type: "video", // or "auto"
          folder: "websites/videos",
        }
      );

      videoUrl = upload.secure_url;
    }

    // ✅ SAVE
    const website = await Website.create({
      name,
      url,
      image: imageUrls[0] || "",
      images: imageUrls,
      video: videoUrl,
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


// ✅ UPDATE WEBSITE (OPTIONAL CLOUDINARY SUPPORT)
export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Website ID required" },
        { status: 400 }
      );
    }

    const name = formData.get("name");
    const url = formData.get("url");

    const imageFiles = formData.getAll("images") as File[];
    const videoFile = formData.get("video") as File;

    let imageUrls: string[] = [];

    // ✅ OPTIONAL: upload new images if provided
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await cloudinary.uploader.upload(
          `data:${file.type};base64,${buffer.toString("base64")}`,
          {
            folder: "websites/images",
          }
        );

        imageUrls.push(upload.secure_url);
      }
    }

    // ✅ OPTIONAL: upload new video
    let videoUrl = "";

    if (videoFile && videoFile.size > 0) {
      const bytes = await videoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await cloudinary.uploader.upload(
        `data:${videoFile.type};base64,${buffer.toString("base64")}`,
        {
          resource_type: "video",
          folder: "websites/videos",
        }
      );

      videoUrl = upload.secure_url;
    }

    const updated = await Website.findByIdAndUpdate(
      id,
      {
        name,
        url,
        ...(imageUrls.length > 0 && {
          image: imageUrls[0],
          images: imageUrls,
        }),
        ...(videoUrl && { video: videoUrl }),
      },
      { new: true }
    );

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