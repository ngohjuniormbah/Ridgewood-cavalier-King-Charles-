import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteItem, updateItem } from "@/lib/store";
import type { Collection } from "@/lib/types";

const VALID: Collection[] = ["pets", "reviews", "gallery"];

function isCollection(value: string): value is Collection {
  return (VALID as string[]).includes(value);
}

export async function PATCH(
  request: Request,
  { params }: { params: { collection: string; id: string } },
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCollection(params.collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    const patch = await request.json();
    const item = await updateItem(params.collection, params.id, patch);
    return NextResponse.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { collection: string; id: string } },
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isCollection(params.collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  try {
    await deleteItem(params.collection, params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
