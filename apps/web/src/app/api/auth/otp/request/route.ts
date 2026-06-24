import { NextResponse } from "next/server";
import { isPhone } from "@/lib/otp";

export async function POST(request: Request) {
  const body = (await request.json()) as { phone?: string };

  if (!body.phone || !isPhone(body.phone)) {
    return NextResponse.json({ message: "Invalid phone number" }, { status: 400 });
  }

  return NextResponse.json({ message: "OTP requested" });
}
