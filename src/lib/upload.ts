import "server-only";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { getSupabaseAdminClient, SUPABASE_URL } from "./supabase";

const BUCKET = "media";
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function extensionFor(fileName: string, type: string): string {
  const fromName = path.extname(fileName).replace(".", "").toLowerCase();
  if (fromName) return fromName;
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/avif": "avif",
  };
  return map[type] ?? "jpg";
}

/**
 * Accepts a file uploaded from a phone or computer (multipart form data) and
 * returns a public URL. Uses Supabase Storage when configured; otherwise
 * writes to /public/uploads for local development.
 */
export async function saveUpload(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = extensionFor(file.name, file.type);
  const key = `${new Date().getFullYear()}/${randomUUID()}.${ext}`;

  const admin = getSupabaseAdminClient();
  if (admin) {
    const { error } = await admin.storage.from(BUCKET).upload(key, bytes, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (error) throw new Error(error.message);
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${key}`;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const localName = key.replace("/", "-");
  await fs.writeFile(path.join(UPLOAD_DIR, localName), bytes);
  return `/uploads/${localName}`;
}
