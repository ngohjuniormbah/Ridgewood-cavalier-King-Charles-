import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateSettings } from "@/lib/store";

export async function PATCH(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const patch = await request.json();
    const settings = await updateSettings(patch);
    return NextResponse.json({ settings });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save settings.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
