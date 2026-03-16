import { connectDB } from "@/lib/mongodb";
import Poster from "@/models/Poster";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await Poster.find();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const item = await Poster.create(body);
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, ...data } = await req.json();
  const item = await Poster.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Poster.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}