import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateContent } from "@/lib/store";

export async function PATCH(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const patch = await request.json();
    const content = await updateContent(patch);
    return NextResponse.json({ content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
