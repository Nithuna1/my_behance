import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";


// ================= GET =================
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query: any = {};

    if (category) {
      query.category = { $in: [category] };
    }

    const services = await Service.find(query).sort({ _id: -1 });

    return NextResponse.json(services);

  } catch (error: any) {
    console.log("GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// ================= HELPER =================
const uploadToCloudinary = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto", folder: "services" }, (err, result) => {
        if (err) reject(err);
        else resolve(result?.secure_url || "");
      })
      .end(buffer);
  });
};


// ================= CREATE =================
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const parseArray = (key: string) => {
      try {
        const value = formData.get(key);
        return value ? JSON.parse(value as string) : [];
      } catch {
        return [];
      }
    };

    // ✅ UPLOAD IMAGES
    const imageFiles = formData.getAll("images") as File[];
    let imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const url = await uploadToCloudinary(file);
        imageUrls.push(url);
      }
    }

    // ✅ UPLOAD VIDEOS
    const videoFiles = formData.getAll("videos") as File[];
    let videoUrls: string[] = [];

    for (const file of videoFiles) {
      if (file && file.size > 0) {
        const url = await uploadToCloudinary(file);
        videoUrls.push(url);
      }
    }

    const service = await Service.create({
      title: formData.get("title"),
      category: parseArray("category"),
      tags: parseArray("tags"),
      websites: parseArray("websites"),
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


// ================= UPDATE =================
export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;

    const parseArray = (key: string) => {
      try {
        const value = formData.get(key);
        return value ? JSON.parse(value as string) : [];
      } catch {
        return [];
      }
    };

    // 🔥 OPTIONAL: handle new uploads (skip for now if not needed)

    const updated = await Service.findByIdAndUpdate(
      id,
      {
        title: formData.get("title"),
        category: parseArray("category"),
        tags: parseArray("tags"),
        websites: parseArray("websites"),
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


// ================= DELETE =================
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