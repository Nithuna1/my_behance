import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { email, password } = await req.json();

  console.log("LOGIN HIT:", email, password);

  if (
    email === "admin@gmail.com" &&
    password === "123456"
  ) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
}