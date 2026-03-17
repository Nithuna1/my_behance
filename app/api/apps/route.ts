import { connectDB } from "@/lib/mongodb";
import App from "@/models/App";
import { NextResponse } from "next/server";


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
      image: imageUrls[0] || "https://via.placeholder.com/100",
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

// ✅ UPDATE APP
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, ...data } = await req.json();

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

    const updated = await App.findByIdAndUpdate(id, data, {
      new: true,
    });

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