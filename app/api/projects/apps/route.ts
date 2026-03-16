import { connectDB } from "@/lib/mongodb";
import App from "@/models/App";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const data = await App.find();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const item = await App.create(body);
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, ...data } = await req.json();
  const item = await App.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await App.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}