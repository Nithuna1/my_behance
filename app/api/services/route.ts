import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";


// ✅ GET (WITH CATEGORY FILTER)
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let query: any = {};

    if (category) {
      query.category = { $in: [category] }; // 🔥 important
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


// ✅ CREATE SERVICE
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    // ✅ HELPER (ONLY DEFINE ONCE)
    const parseArray = (key: string) => {
      try {
        const value = formData.get(key);
        return value ? JSON.parse(value as string) : [];
      } catch {
        return [];
      }
    };

    // ✅ IMAGES
    const imageFiles = formData.getAll("images") as File[];
    let imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        imageUrls.push(base64);
      }
    }

    // ✅ VIDEOS
    const videoFiles = formData.getAll("videos") as File[];
    let videoUrls: string[] = [];

    for (const file of videoFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
        videoUrls.push(base64);
      }
    }

    // ✅ CREATE DOCUMENT
    const service = await Service.create({
      title: formData.get("title"),

      // 🔥 CATEGORY ARRAY
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


// ✅ UPDATE SERVICE
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

    const updated = await Service.findByIdAndUpdate(
      id,
      {
        title: formData.get("title"),

        // 🔥 FIXED (use category not type)
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


// ✅ DELETE SERVICE
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