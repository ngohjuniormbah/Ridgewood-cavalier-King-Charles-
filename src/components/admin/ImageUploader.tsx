"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

interface Props {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  hint?: string;
}

/**
 * Uploads image files chosen from a computer or phone (the file picker offers
 * the camera on mobile). Files are sent to /api/admin/upload and stored either
 * in Supabase Storage or locally, depending on configuration. No URLs required.
 */
export default function ImageUploader({ label, value, onChange, multiple = false, hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        uploaded.push(data.url);
        if (!multiple) break;
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(0, 1));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal/80">{label}</label>

      {value.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {value.map((url) => (
            <div key={url} className="relative h-20 w-20 overflow-hidden rounded-xl border border-charcoal/10">
              <Image src={url} alt="Uploaded" fill className="object-cover" sizes="80px" />
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-cream"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-charcoal/25 bg-cream px-4 py-4 text-sm font-medium text-charcoal/70 transition hover:border-chestnut hover:text-chestnut disabled:opacity-60"
      >
        {uploading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</>
        ) : (
          <><ImagePlus className="h-4 w-4" /> {multiple ? "Upload image(s)" : "Upload image"}</>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {hint && <p className="mt-1.5 text-xs text-charcoal/50">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
