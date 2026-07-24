import { NextResponse } from "next/server";

/**
 * Receives contact enquiries. In this build the enquiry is validated and
 * acknowledged. To deliver it to your inbox, connect an email provider
 * (e.g. Resend) or store it in Supabase — a single call added here is all
 * that's needed. The public form works today either way.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    // Enquiry received. Hook up email/Supabase delivery here when ready.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
