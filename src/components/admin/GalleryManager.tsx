"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/lib/types";
import { Field, TextInput, Select } from "./fields";
import ImageUploader from "./ImageUploader";
import { createItem, deleteItem } from "./api";

const CATEGORIES: GalleryCategory[] = ["Puppies", "Parents", "Families", "Life at Ridgewood"];

const empty = {
  title: "",
  caption: "",
  category: "Puppies" as GalleryCategory,
  image: [] as string[],
};

export default function GalleryManager({ gallery }: { gallery: GalleryItem[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (form.image.length === 0) {
      setError("Please upload an image.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await createItem("gallery", {
        title: form.title,
        caption: form.caption,
        category: form.category,
        image: form.image[0],
      });
      setForm({ ...empty });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this photo?")) return;
    await deleteItem("gallery", id);
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form onSubmit={add} className="h-fit space-y-4 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="font-serif text-xl text-ink">Add a photo</h3>
        <ImageUploader
          label="Photo"
          value={form.image}
          onChange={(v) => set("image", v)}
          hint="Upload from your computer or phone."
        />
        <Field label="Title">
          <TextInput value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </Field>
        <Field label="Caption (optional)">
          <TextInput value={form.caption} onChange={(e) => set("caption", e.target.value)} />
        </Field>
        <Field label="Category">
          <Select value={form.category} onChange={(e) => set("category", e.target.value as GalleryCategory)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </Select>
        </Field>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4" /> Add photo</>}
        </button>
      </form>

      <div>
        {gallery.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-charcoal/20 p-8 text-center text-sm text-charcoal/60">
            No photos yet — add your first on the left.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-soft">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 200px" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3">
                  <p className="truncate text-xs font-medium text-cream">{item.title}</p>
                  <p className="text-[0.65rem] text-cream/70">{item.category}</p>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-cream opacity-0 transition group-hover:opacity-100"
                  aria-label={`Remove ${item.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
