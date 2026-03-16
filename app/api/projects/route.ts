import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    await connectDB();

    const projects = await Project.find().sort({ _id: -1 });

    return NextResponse.json(projects);

  } catch (error) {

    console.log(error);

    return NextResponse.json([]);

  }
}

export async function POST(req: Request) {

  await connectDB();

  const body = await req.json();

  const project = await Project.create(body);

  return NextResponse.json(project);

}

export async function DELETE(req: Request) {

  await connectDB();

  const { id } = await req.json();

  await Project.findByIdAndDelete(id);

  return NextResponse.json({ success:true });

}