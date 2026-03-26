import { connectDB } from "@/lib/mongodb";
import Poster from "@/models/Poster";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


// ==============================
// 🔥 CLOUDINARY UPLOAD FUNCTION
// ==============================
const uploadToCloudinary = async (buffer: Buffer) => {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "posters" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};


// ==============================
// ✅ GET ALL POSTERS
// ==============================
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


// ==============================
// ✅ CREATE POSTER (CLOUDINARY)
// ==============================
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    // 🔥 UPLOAD TO CLOUDINARY
    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await uploadToCloudinary(buffer);

        // ✅ CLOUDINARY URL
        imageUrls.push(uploadResult.secure_url);
      }
    }

    // ❗ Require at least one image
    if (imageUrls.length === 0) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 }
      );
    }

    // ✅ CREATE POSTER (LIKE PROJECT STRUCTURE)
    const poster = await Poster.create({
      title: formData.get("title"),
      category: formData.get("category"),

      // 🔥 SAME STRUCTURE YOU WANT
      image: imageUrls[0],
      gallery: imageUrls,
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


// ==============================
// ✅ UPDATE POSTER (CLOUDINARY)
// ==============================
export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Poster ID is required" },
        { status: 400 }
      );
    }

    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    // 🔥 UPLOAD NEW IMAGES
    for (const file of files) {
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await uploadToCloudinary(buffer);

        imageUrls.push(uploadResult.secure_url);
      }
    }

    const updateData: any = {
      title: formData.get("title"),
      category: formData.get("category"),
    };

    // 🔥 ONLY UPDATE IF NEW IMAGES PROVIDED
    if (imageUrls.length > 0) {
      updateData.image = imageUrls[0];
      updateData.gallery = imageUrls;
    }

    const updated = await Poster.findByIdAndUpdate(id, updateData, {
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


// ==============================
// ✅ DELETE POSTER
// ==============================
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