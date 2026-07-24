import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createItem } from "@/lib/store";
import type { Collection } from "@/lib/types";

const VALID: Collection[] = ["pets", "reviews", "gallery", "messages"];

function isCollection(value: string): value is Collection {
  return (VALID as string[]).includes(value);
}

export async function POST(
  request: Request,
  { params }: { params: { collection: string } },
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCollection(params.collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const created = await createItem(params.collection, body);
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
