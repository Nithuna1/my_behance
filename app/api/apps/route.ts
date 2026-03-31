import { connectDB } from "@/lib/mongodb";
import App from "@/models/App";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// ✅ GET ALL APPS
export async function GET() {
  try {
    await connectDB();

    const apps = await App.find().sort({ _id: -1 });

    return NextResponse.json(apps);

  } catch (error: any) {
    console.log("GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// ✅ CREATE APP
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const files = formData.getAll("images") as File[];
    const primaryIndex = Number(formData.get("primaryIndex") || 0);

    let imageUrls: string[] = [];

    // upload images
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await cloudinary.uploader.upload(
          `data:${file.type};base64,${buffer.toString("base64")}`,
          { folder: "apps/images" }
        );

        imageUrls.push(upload.secure_url);
      }
    }

    // features
    let features: string[] = [];
    try {
      const raw = formData.get("features");
      features = raw ? JSON.parse(raw as string) : [];
    } catch {
      features = [];
    }

    const app = await App.create({
      title: formData.get("title"),
      fullDescription: formData.get("fullDescription"),
      bestFor: formData.get("bestFor"),
      features,
      image: imageUrls[primaryIndex] || imageUrls[0] || "",
      gallery: imageUrls,
    });

    return NextResponse.json({ success: true, app });

  } catch (error: any) {
    console.log("POST ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


// ✅ UPDATE APP (🔥 FIXED VERSION)
export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "App ID is required" },
        { status: 400 }
      );
    }

    const files = formData.getAll("images") as File[];
    const primaryIndex = Number(formData.get("primaryIndex") || 0);

    let newImageUrls: string[] = [];

    // upload new images
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await cloudinary.uploader.upload(
          `data:${file.type};base64,${buffer.toString("base64")}`,
          { folder: "apps/images" }
        );

        newImageUrls.push(upload.secure_url);
      }
    }

    // features
    let features: string[] = [];
    try {
      const raw = formData.get("features");
      features = raw ? JSON.parse(raw as string) : [];
    } catch {
      features = [];
    }

    // ✅ GET EXISTING APP
    const existingApp = await App.findById(id);

    if (!existingApp) {
      return NextResponse.json(
        { success: false, message: "App not found" },
        { status: 404 }
      );
    }

    // ✅ KEEP OLD + ADD NEW IMAGES
    let finalGallery = existingApp.gallery || [];

    if (newImageUrls.length > 0) {
      finalGallery = [...finalGallery, ...newImageUrls];
    }

    // ✅ UPDATE DATA
    const updated = await App.findByIdAndUpdate(
      id,
      {
        title: formData.get("title"),
        fullDescription: formData.get("fullDescription"),
        bestFor: formData.get("bestFor"),
        features,
        gallery: finalGallery,
        image:
          finalGallery[primaryIndex] || finalGallery[0],
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      app: updated,
    });

  } catch (error: any) {
    console.log("PUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update app",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// ✅ DELETE APP
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "App ID is required" },
        { status: 400 }
      );
    }

    const existing = await App.findById(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "App not found" },
        { status: 404 }
      );
    }

    await App.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "App deleted successfully",
    });

  } catch (error: any) {
    console.log("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete app",
        error: error.message,
      },
      { status: 500 }
    );
  }
}