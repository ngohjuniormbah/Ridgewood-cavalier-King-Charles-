"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, CheckCircle2 } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { Field, TextInput, TextArea } from "./fields";
import ImageUploader from "./ImageUploader";

export default function ContentManager({ content }: { content: SiteContent }) {
  const router = useRouter();
  const [form, setForm] = useState<SiteContent>(content);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  function set<K extends keyof SiteContent>(key: K, val: SiteContent[K]) {
    setForm((f) => ({ ...f, [key]: val }));
    setStatus("idle");
  }

  function setColour(index: number, key: "name" | "image" | "desc", val: string) {
    setForm((f) => {
      const colours = f.colours.map((c, i) => (i === index ? { ...c, [key]: val } : c));
      return { ...f, colours };
    });
    setStatus("idle");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not save");
      setStatus("saved");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={save} className="max-w-2xl space-y-6">
      <p className="text-sm text-charcoal/60">
        Edit the wording and photos of the main home-page sections. Changes appear on the
        site straight away.
      </p>

      {/* Hero */}
      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="mb-4 font-serif text-xl text-ink">Hero (top banner)</h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Headline — line 1">
              <TextInput value={form.heroTitleLine1} onChange={(e) => set("heroTitleLine1", e.target.value)} />
            </Field>
            <Field label="Headline — line 2 (highlighted)">
              <TextInput value={form.heroTitleLine2} onChange={(e) => set("heroTitleLine2", e.target.value)} />
            </Field>
          </div>
          <Field label="Sub-heading">
            <TextArea rows={3} value={form.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)} />
          </Field>
        </div>
      </div>

      {/* Story */}
      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="mb-4 font-serif text-xl text-ink">Our Story section</h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Small label (eyebrow)">
              <TextInput value={form.storyEyebrow} onChange={(e) => set("storyEyebrow", e.target.value)} />
            </Field>
            <Field label="Heading">
              <TextInput value={form.storyTitle} onChange={(e) => set("storyTitle", e.target.value)} />
            </Field>
          </div>
          <Field label="Body (leave a blank line between paragraphs)">
            <TextArea rows={5} value={form.storyBody} onChange={(e) => set("storyBody", e.target.value)} />
          </Field>
          <ImageUploader
            label="Story photo"
            value={form.storyImage ? [form.storyImage] : []}
            onChange={(v) => set("storyImage", v[0] ?? "")}
            hint="Upload from your computer or phone."
          />
        </div>
      </div>

      {/* Colours */}
      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="mb-4 font-serif text-xl text-ink">The Four Colours section</h3>
        <div className="space-y-4">
          <Field label="Heading">
            <TextInput value={form.coloursTitle} onChange={(e) => set("coloursTitle", e.target.value)} />
          </Field>
          <Field label="Description">
            <TextArea rows={2} value={form.coloursDescription} onChange={(e) => set("coloursDescription", e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            {form.colours.map((c, i) => (
              <div key={i} className="rounded-xl border border-charcoal/10 bg-cream p-4">
                <ImageUploader
                  label={`Photo ${i + 1}`}
                  value={c.image ? [c.image] : []}
                  onChange={(v) => setColour(i, "image", v[0] ?? "")}
                />
                <div className="mt-3 space-y-3">
                  <Field label="Name">
                    <TextInput value={c.name} onChange={(e) => setColour(i, "name", e.target.value)} />
                  </Field>
                  <Field label="Short description">
                    <TextInput value={c.desc} onChange={(e) => setColour(i, "desc", e.target.value)} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="mb-4 font-serif text-xl text-ink">Closing call-to-action</h3>
        <div className="space-y-4">
          <Field label="Heading">
            <TextInput value={form.ctaTitle} onChange={(e) => set("ctaTitle", e.target.value)} />
          </Field>
          <Field label="Text">
            <TextArea rows={2} value={form.ctaText} onChange={(e) => set("ctaText", e.target.value)} />
          </Field>
        </div>
      </div>

      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="sticky bottom-4 flex items-center gap-4 rounded-2xl border border-charcoal/10 bg-white/90 p-4 shadow-lift backdrop-blur">
        <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving…" : (<><Save className="h-4 w-4" /> Save content</>)}
        </button>
        {status === "saved" && (
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
