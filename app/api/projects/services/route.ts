import { connectDB } from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await Service.find();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const item = await Service.create(body);
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, ...data } = await req.json();
  const item = await Service.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Service.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}