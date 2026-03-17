import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// ✅ GET SINGLE
export async function GET(_: any, { params }: any) {
  await connectDB();

  const project = await Project.findById(params.id);
  return NextResponse.json(project);
}

// ✅ UPDATE
export async function PUT(req: Request, { params }: any) {
  await connectDB();

  const formData = await req.formData();

  const files = formData.getAll("images") as File[];

  let imageUrls: string[] = [];

  for (const file of files) {
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      imageUrls.push(
        `data:${file.type};base64,${buffer.toString("base64")}`
      );
    }
  }

  const updated = await Project.findByIdAndUpdate(
    params.id,
    {
      title: formData.get("title"),
      author: formData.get("author"),
      year: formData.get("year"),
      category: formData.get("category"),
      description: formData.get("description"),

      ...(imageUrls.length > 0 && {
        image: imageUrls[0],
        gallery: imageUrls,
      }),
    },
    { new: true }
  );

  return NextResponse.json({ success: true, updated });
}