import { connectDB } from "@/lib/mongodb";
import Ecommerce from "@/models/Ecommerce";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

// ✅ GET
export async function GET() {
  await connectDB();
  const data = await Ecommerce.find().sort({ _id: -1 });
  return NextResponse.json(data);
}

// ✅ POST
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const website = formData.get("website") as string;
    const image = formData.get("image") as File;
    const video = formData.get("video") as File;

    // 🔥 IMAGE UPLOAD
    let imageUrl = "";
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "ecommerce/images" },
          (err, res) => err ? reject(err) : resolve(res)
        ).end(buffer);
      });

      imageUrl = upload.secure_url;
    }

    // 🔥 VIDEO UPLOAD
    let videoUrl = "";
    if (video && video.size > 0) {
      const bytes = await video.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "ecommerce/videos" },
          (err, res) => err ? reject(err) : resolve(res)
        ).end(buffer);
      });

      videoUrl = upload.secure_url;
    }

    const item = await Ecommerce.create({
      image: imageUrl,
      video: videoUrl,
      website,
    });

    return NextResponse.json({ success: true, item });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

// ✅ DELETE
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Ecommerce.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

// ✅ UPDATE
export async function PUT(req: Request) {
  await connectDB();

  const { id, ...data } = await req.json();

  const updated = await Ecommerce.findByIdAndUpdate(id, data, { new: true });

  return NextResponse.json({ success: true, item: updated });
}