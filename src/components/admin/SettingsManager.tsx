"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, CheckCircle2 } from "lucide-react";
import type { Settings } from "@/lib/types";
import { Field, TextInput, TextArea } from "./fields";

export default function SettingsManager({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [form, setForm] = useState<Settings>(settings);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  function set<K extends keyof Settings>(key: K, val: Settings[K]) {
    setForm((f) => ({ ...f, [key]: val }));
    setStatus("idle");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reservationFee: Number(form.reservationFee) }),
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
      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="mb-4 font-serif text-xl text-ink">Contact details</h3>
        <div className="space-y-4">
          <Field label="Email address (shown across the site)">
            <TextInput type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone number (optional)">
              <TextInput value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Leave blank to hide" />
            </Field>
            <Field label="Location (optional)">
              <TextInput value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Leave blank to hide" />
            </Field>
          </div>
          <Field label="Announcement bar (optional)">
            <TextInput value={form.announcement} onChange={(e) => set("announcement", e.target.value)} placeholder="e.g. New litter arriving this spring" />
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="mb-4 font-serif text-xl text-ink">Adoption</h3>
        <Field label="Reservation fee (USD)">
          <TextInput
            type="number"
            min={0}
            value={form.reservationFee}
            onChange={(e) => set("reservationFee", Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="mb-4 font-serif text-xl text-ink">Social links</h3>
        <div className="space-y-4">
          <Field label="Facebook URL">
            <TextInput value={form.facebook} onChange={(e) => set("facebook", e.target.value)} placeholder="https://facebook.com/…" />
          </Field>
          <Field label="Instagram URL">
            <TextInput value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://instagram.com/…" />
          </Field>
          <Field label="TikTok URL">
            <TextInput value={form.tiktok} onChange={(e) => set("tiktok", e.target.value)} placeholder="https://tiktok.com/@…" />
          </Field>
        </div>
      </div>

      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving…" : (<><Save className="h-4 w-4" /> Save settings</>)}
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
