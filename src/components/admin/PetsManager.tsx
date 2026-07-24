"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import type { Pet, PetColour, PetStatus } from "@/lib/types";
import { Field, TextInput, TextArea, Select } from "./fields";
import ImageUploader from "./ImageUploader";
import StatusBadge from "@/components/StatusBadge";
import { createItem, deleteItem, updateItem } from "./api";

const COLOURS: PetColour[] = ["Blenheim", "Tricolour", "Ruby", "Black & Tan"];
const STATUSES: PetStatus[] = ["available", "reserved", "cancelled", "sold"];

const empty = {
  name: "",
  colour: "Blenheim" as PetColour,
  gender: "Female" as Pet["gender"],
  birthDate: "",
  price: 3200,
  status: "available" as PetStatus,
  description: "",
  images: [] as string[],
  featured: false,
};

export default function PetsManager({ pets }: { pets: Pet[] }) {
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
      await createItem("pets", { ...form, price: Number(form.price) });
      setForm({ ...empty });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(pet: Pet, status: PetStatus) {
    await updateItem("pets", pet.id, { status });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Remove this puppy?")) return;
    await deleteItem("pets", id);
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      {/* Add form */}
      <form onSubmit={add} className="h-fit space-y-4 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-soft">
        <h3 className="font-serif text-xl text-ink">Add a puppy</h3>
        <ImageUploader
          label="Photos"
          value={form.images}
          onChange={(images) => set("images", images)}
          multiple
          hint="Upload one or more photos from your computer or phone."
        />
        <Field label="Name">
          <TextInput value={form.name} onChange={(e) => set("name", e.target.value)} required />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Colour">
            <Select value={form.colour} onChange={(e) => set("colour", e.target.value as PetColour)}>
              {COLOURS.map((c) => <option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Gender">
            <Select value={form.gender} onChange={(e) => set("gender", e.target.value as Pet["gender"])}>
              <option>Female</option>
              <option>Male</option>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Born">
            <TextInput type="date" value={form.birthDate} onChange={(e) => set("birthDate", e.target.value)} />
          </Field>
          <Field label="Price (USD)">
            <TextInput
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => set("price", Number(e.target.value))}
            />
          </Field>
        </div>
        <Field label="Status">
          <Select value={form.status} onChange={(e) => set("status", e.target.value as PetStatus)}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="Description">
          <TextArea rows={4} value={form.description} onChange={(e) => set("description", e.target.value)} required />
        </Field>
        <label className="flex items-center gap-2 text-sm text-charcoal/80">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 rounded border-charcoal/30 text-chestnut focus:ring-chestnut"
          />
          Feature on the home page
        </label>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4" /> Add puppy</>}
        </button>
      </form>

      {/* Existing list */}
      <div className="space-y-3">
        {pets.length === 0 && (
          <p className="rounded-2xl border border-dashed border-charcoal/20 p-8 text-center text-sm text-charcoal/60">
            No puppies yet — add your first on the left.
          </p>
        )}
        {pets.map((pet) => (
          <div key={pet.id} className="flex items-center gap-4 rounded-2xl border border-charcoal/10 bg-white p-4 shadow-soft">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
              {pet.images[0] && (
                <Image src={pet.images[0]} alt={pet.name} fill className="object-cover" sizes="64px" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-ink">{pet.name}</p>
                <StatusBadge status={pet.status} />
              </div>
              <p className="text-xs text-charcoal/50">{pet.colour} · {pet.gender} · ${pet.price.toLocaleString()}</p>
            </div>
            <div className="hidden w-36 shrink-0 sm:block">
              <Select
                value={pet.status}
                onChange={(e) => changeStatus(pet, e.target.value as PetStatus)}
                aria-label={`Status for ${pet.name}`}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
            </div>
            <button
              onClick={() => remove(pet.id)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-charcoal/50 hover:bg-rose-50 hover:text-rose-600"
              aria-label={`Remove ${pet.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
