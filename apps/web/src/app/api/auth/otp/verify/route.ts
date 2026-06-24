import { NextResponse } from "next/server";
import { isRole } from "@/lib/auth";
import { getOtpCode, isPhone } from "@/lib/otp";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    phone?: string;
    code?: string;
    role?: string;
  };

  if (!body.phone || !body.code || !body.role) {
    return NextResponse.json({ message: "Missing auth payload" }, { status: 400 });
  }

  if (!isPhone(body.phone) || body.code !== getOtpCode() || !isRole(body.role)) {
    return NextResponse.json({ message: "Invalid auth payload" }, { status: 401 });
  }

  const response = NextResponse.json({ message: "OTP verified", role: body.role });
  response.cookies.set("session_role", body.role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
