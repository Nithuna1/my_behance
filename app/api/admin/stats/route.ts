import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Service from "@/models/Service";
import App from "@/models/App";
import Website from "@/models/Website";
import Poster from "@/models/Poster";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.countDocuments();
    const apps = await App.countDocuments();
    const services = await Service.countDocuments();
    const websites = await Website.countDocuments();
    const posters = await Poster.countDocuments();

    return NextResponse.json({
      projects,
      apps,
      services,
      websites,
      posters,
    });

  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}