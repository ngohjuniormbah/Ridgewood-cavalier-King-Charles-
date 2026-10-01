import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkPassword, createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin password is not configured. Set ADMIN_PASSWORD in your environment." },
      { status: 500 },
    );
  }

  if (!checkPassword(String(password ?? ""))) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  cookies().set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  cookies().delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
