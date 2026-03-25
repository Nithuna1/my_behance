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


// ✅ CREATE APP (🔥 CLOUDINARY)
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const files = formData.getAll("images") as File[];

    let imageUrls: string[] = [];

    // ✅ UPLOAD IMAGES TO CLOUDINARY
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await cloudinary.uploader.upload(
          `data:${file.type};base64,${buffer.toString("base64")}`,
          {
            folder: "apps/images",
          }
        );

        imageUrls.push(upload.secure_url);
      }
    }

    // ✅ SAFE FEATURES PARSE
    let features: string[] = [];
    try {
      const raw = formData.get("features");
      features = raw ? JSON.parse(raw as string) : [];
    } catch (err) {
      console.log("FEATURE ERROR:", err);
      features = [];
    }

    // ✅ CREATE APP
    const app = await App.create({
      title: formData.get("title"),
      fullDescription: formData.get("fullDescription"),
      bestFor: formData.get("bestFor"),
      features,
      image: imageUrls[0] || "",
      gallery: imageUrls,
    });

    return NextResponse.json({
      success: true,
      app,
    });

  } catch (error: any) {
    console.log("POST ERROR FULL:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}


// ✅ UPDATE APP (OPTIONAL CLOUDINARY SUPPORT)
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

    let imageUrls: string[] = [];

    // ✅ Upload new images if provided
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await cloudinary.uploader.upload(
          `data:${file.type};base64,${buffer.toString("base64")}`,
          {
            folder: "apps/images",
          }
        );

        imageUrls.push(upload.secure_url);
      }
    }

    // ✅ FEATURES PARSE
    let features: string[] = [];
    try {
      const raw = formData.get("features");
      features = raw ? JSON.parse(raw as string) : [];
    } catch {
      features = [];
    }

    const updated = await App.findByIdAndUpdate(
      id,
      {
        title: formData.get("title"),
        fullDescription: formData.get("fullDescription"),
        bestFor: formData.get("bestFor"),
        features,
        ...(imageUrls.length > 0 && {
          image: imageUrls[0],
          gallery: imageUrls,
        }),
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