import { NextResponse } from "next/server";
import { createItem } from "@/lib/store";
import type { Lead } from "@/lib/types";

/**
 * Public lead capture (the "be first to know" popup). Anyone can submit; the
 * lead lands in the admin Leads inbox.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (!name || !email) {
      return NextResponse.json({ error: "Please add your name and email." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    const lead: Omit<Lead, "id"> = {
      name,
      email,
      phone,
      read: false,
      createdAt: new Date().toISOString(),
    };

    await createItem("leads", lead);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Could not submit.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
