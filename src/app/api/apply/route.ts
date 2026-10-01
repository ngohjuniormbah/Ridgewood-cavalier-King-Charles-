import { NextResponse } from "next/server";
import { createItem } from "@/lib/store";
import type { Message } from "@/lib/types";

/**
 * Public adoption application. Anyone can submit; the application lands in the
 * admin Messages inbox. (For live delivery before Supabase is connected, hook
 * an email provider here — the write itself needs Supabase to persist online.)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();

    if (!fullName || !email || !phone || !address) {
      return NextResponse.json(
        { error: "Please complete your name, email, phone and address." },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }
    if (!body.agreedTerms) {
      return NextResponse.json(
        { error: "Please accept the adoption terms and conditions." },
        { status: 400 },
      );
    }
    if (!body.acknowledgedFee) {
      return NextResponse.json(
        { error: "Please acknowledge the $250 reservation fee." },
        { status: 400 },
      );
    }

    const message: Omit<Message, "id"> = {
      fullName,
      email,
      phone,
      address,
      puppy: String(body.puppy ?? "").trim() || undefined,
      hasChildren: Boolean(body.hasChildren),
      childrenCount: Number(body.childrenCount) || 0,
      raisedPetBefore: Boolean(body.raisedPetBefore),
      wantsNameChange: Boolean(body.wantsNameChange),
      newName: String(body.newName ?? "").trim() || undefined,
      agreedTerms: true,
      acknowledgedFee: true,
      notes: String(body.notes ?? "").trim() || undefined,
      read: false,
      createdAt: new Date().toISOString(),
    };

    await createItem("messages", message);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Could not submit application.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
