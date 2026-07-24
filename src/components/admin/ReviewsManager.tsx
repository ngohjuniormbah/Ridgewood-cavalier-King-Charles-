"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, Star } from "lucide-react";
import type { Review, ReviewSource } from "@/lib/types";
import { Field, TextInput, TextArea, Select } from "./fields";
import ImageUploader from "./ImageUploader";
import SourceBadge from "@/components/SourceBadge";
import { createItem, deleteItem } from "./api";

const SOURCES: ReviewSource[] = ["google", "facebook", "tiktok"];

const empty = {
  author: "",
  location: "",
  source: "google" as ReviewSource,
  rating: 5,
  text: "",
  avatar: [] as string[],
  photo: [] as string[],
  link: "",
};

export default function ReviewsManager({ reviews }: { reviews: Review[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createItem("reviews", {
        author: form.author,
        location: form.location,
        source: form.source,
        rating: Number(form.rating),
        text: form.text,
        avatar: form.avatar[0] ?? "",
        photo: form.photo[0] ?? "",
        link: form.link,
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
    if (!confirm("Remove this review?")) return;
    await deleteItem("reviews", id);
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form onSubmit={add} className="h-fit space-y-4 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="font-serif text-xl text-ink">Add a review</h3>

        <ImageUploader
          label="Reviewer profile picture"
          value={form.avatar}
          onChange={(v) => set("avatar", v)}
          hint="Optional — the reviewer's profile photo."
        />
        <Field label="Reviewer name">
          <TextInput value={form.author} onChange={(e) => set("author", e.target.value)} required />
        </Field>
        <Field label="Location (optional)">
          <TextInput value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Columbus, OH" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Shown as from">
            <Select value={form.source} onChange={(e) => set("source", e.target.value as ReviewSource)}>
              {SOURCES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
            </Select>
          </Field>
          <Field label="Rating">
            <Select value={form.rating} onChange={(e) => set("rating", Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
            </Select>
          </Field>
        </div>
        <Field label="Review text">
          <TextArea rows={4} value={form.text} onChange={(e) => set("text", e.target.value)} required />
        </Field>
        <ImageUploader
          label="Picture in the review"
          value={form.photo}
          onChange={(v) => set("photo", v)}
          hint="Optional — a photo attached to the review (e.g. of their puppy)."
        />
        <Field label="Link in the review (optional)">
          <TextInput
            type="url"
            value={form.link}
            onChange={(e) => set("link", e.target.value)}
            placeholder="https://…"
          />
        </Field>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4" /> Add review</>}
        </button>
      </form>

      <div className="space-y-3">
        {reviews.length === 0 && (
          <p className="rounded-2xl border border-dashed border-charcoal/20 p-8 text-center text-sm text-charcoal/60">
            No reviews yet — add your first on the left.
          </p>
        )}
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-charcoal/10 bg-white p-5 shadow-soft">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="font-medium text-ink">{review.author}</p>
                <SourceBadge source={review.source} />
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-0.5 text-xs text-charcoal/60">
                  {review.rating} <Star className="h-3 w-3 fill-gold text-gold" />
                </span>
                <button
                  onClick={() => remove(review.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-charcoal/50 hover:bg-rose-50 hover:text-rose-600"
                  aria-label={`Remove review by ${review.author}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-charcoal/70 line-clamp-2">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
