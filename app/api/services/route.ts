import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import mongoose from "mongoose";

// ==============================
// ✅ GET (WITH CATEGORY FILTER)
// ==============================
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query: any = {};

    if (category) {
      query.category = { $in: [category] };
    }

    const services = await Service.find(query)
      .sort({ _id: -1 })
      .lean();

    return NextResponse.json(services);
  } catch (error: any) {
    console.log("GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ==============================
// 🔧 HELPER
// ==============================
const parseArray = (formData: FormData, key: string) => {
  try {
    const value = formData.get(key);
    return value ? JSON.parse(value as string) : [];
  } catch {
    return [];
  }
};

// ==============================
// 🔥 CLOUDINARY UPLOAD
// ==============================
const uploadFile = async (file: File, folder: string) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const upload = await cloudinary.uploader.upload(
    `data:${file.type};base64,${buffer.toString("base64")}`,
    {
      resource_type: "auto",
      folder,
    }
  );

  return upload.secure_url;
};

// ==============================
// ✅ CREATE SERVICE
// ==============================
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    // 🔹 IMAGES
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const url = await uploadFile(file, "services/images");
        imageUrls.push(url);
      }
    }

    // 🔹 VIDEOS
    const videoFiles = formData.getAll("videos") as File[];
    const videoUrls: string[] = [];

    for (const file of videoFiles) {
      if (file && file.size > 0) {
        const url = await uploadFile(file, "services/videos");
        videoUrls.push(url);
      }
    }

    const service = await Service.create({
      title: formData.get("title"),
      category: parseArray(formData, "category"),
      tags: parseArray(formData, "tags"),
      websites: parseArray(formData, "websites"),
      images: imageUrls,
      videos: videoUrls,
    });

    return NextResponse.json({
      success: true,
      service,
    });
  } catch (error: any) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create service",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ==============================
// ✅ UPDATE SERVICE (🔥 FIXED)
// ==============================
export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const existingService = await Service.findById(id);

    if (!existingService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    // ==============================
    // 🔹 HANDLE IMAGES
    // ==============================
    const imageFiles = formData.getAll("images") as File[];
    let imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const url = await uploadFile(file, "services/images");
        imageUrls.push(url);
      }
    }

    // keep old images if no new upload
    if (imageUrls.length === 0) {
      imageUrls = existingService.images || [];
    }

    // ==============================
    // 🔹 HANDLE VIDEOS (🔥 FIX)
    // ==============================
    const videoFiles = formData.getAll("videos") as File[];
    let videoUrls: string[] = [];

    for (const file of videoFiles) {
      if (file && file.size > 0) {
        const url = await uploadFile(file, "services/videos");
        videoUrls.push(url);
      }
    }

    // keep old videos if no new upload
    if (videoUrls.length === 0) {
      videoUrls = existingService.videos || [];
    }

    // ==============================
    // 🔹 UPDATE DATA
    // ==============================
    const updated = await Service.findByIdAndUpdate(
      id,
      {
        title: formData.get("title"),
        category: parseArray(formData, "category"),
        tags: parseArray(formData, "tags"),
        websites: parseArray(formData, "websites"),
        images: imageUrls,
        videos: videoUrls, // ✅ FIXED
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      service: updated,
    });
  } catch (error: any) {
    console.log("PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update service",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ==============================
// ✅ DELETE SERVICE
// ==============================
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Service ID required" },
        { status: 400 }
      );
    }

    await Service.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error: any) {
    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete service",
        error: error.message,
      },
      { status: 500 }
    );
  }
}