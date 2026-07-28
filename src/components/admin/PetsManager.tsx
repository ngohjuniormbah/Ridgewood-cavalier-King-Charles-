"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, Pencil, X, Save } from "lucide-react";
import type { Pet, PetColour, PetStatus } from "@/lib/types";
import { Field, TextInput, TextArea, Select } from "./fields";
import ImageUploader from "./ImageUploader";
import StatusBadge from "@/components/StatusBadge";
import { createItem, deleteItem, updateItem } from "./api";

const COLOURS: PetColour[] = ["Blenheim", "Tricolour", "Ruby", "Black & Tan"];
const STATUSES: PetStatus[] = ["available", "reserved", "cancelled"];

type PetForm = {
  name: string;
  colour: PetColour;
  price: number;
  status: PetStatus;
  description: string;
  images: string[];
  featured: boolean;
};

const empty: PetForm = {
  name: "",
  colour: "Blenheim",
  price: 3200,
  status: "available",
  description: "",
  images: [],
  featured: false,
};

export default function PetsManager({ pets }: { pets: Pet[] }) {
  const router = useRouter();
  const [form, setForm] = useState<PetForm>({ ...empty });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Editing an existing puppy
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PetForm>({ ...empty });
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");

  function set<K extends keyof PetForm>(key: K, val: PetForm[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function setEdit<K extends keyof PetForm>(key: K, val: PetForm[K]) {
    setEditForm((f) => ({ ...f, [key]: val }));
  }

  function openEdit(pet: Pet) {
    setEditingId(pet.id);
    setEditError("");
    setEditForm({
      name: pet.name,
      colour: pet.colour,
      price: pet.price,
      status: pet.status,
      description: pet.description,
      images: pet.images ?? [],
      featured: Boolean(pet.featured),
    });
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    setEditSaving(true);
    setEditError("");
    try {
      await updateItem("pets", editingId, { ...editForm, price: Number(editForm.price) });
      setEditingId(null);
      router.refresh();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setEditSaving(false);
    }
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
              <p className="text-xs text-charcoal/50">{pet.colour} · ${pet.price.toLocaleString()}</p>
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
              onClick={() => openEdit(pet)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-charcoal/50 hover:bg-chestnut/10 hover:text-chestnut"
              aria-label={`Edit ${pet.name}`}
            >
              <Pencil className="h-4 w-4" />
            </button>
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

      {/* Edit modal */}
      {editingId && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur"
          onClick={() => setEditingId(null)}
        >
          <form
            onSubmit={saveEdit}
            onClick={(e) => e.stopPropagation()}
            className="my-8 w-full max-w-lg space-y-4 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-lift"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-ink">Edit puppy</h3>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal/50 hover:bg-charcoal/5"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ImageUploader
              label="Photos"
              value={editForm.images}
              onChange={(images) => setEdit("images", images)}
              multiple
              hint="Upload one or more photos from your computer or phone."
            />
            <Field label="Name">
              <TextInput value={editForm.name} onChange={(e) => setEdit("name", e.target.value)} required />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Colour">
                <Select value={editForm.colour} onChange={(e) => setEdit("colour", e.target.value as PetColour)}>
                  {COLOURS.map((c) => <option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Price (USD)">
                <TextInput
                  type="number"
                  min={0}
                  value={editForm.price}
                  onChange={(e) => setEdit("price", Number(e.target.value))}
                />
              </Field>
            </div>
            <Field label="Status">
              <Select value={editForm.status} onChange={(e) => setEdit("status", e.target.value as PetStatus)}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
            </Field>
            <Field label="Description">
              <TextArea rows={4} value={editForm.description} onChange={(e) => setEdit("description", e.target.value)} required />
            </Field>
            <label className="flex items-center gap-2 text-sm text-charcoal/80">
              <input
                type="checkbox"
                checked={editForm.featured}
                onChange={(e) => setEdit("featured", e.target.checked)}
                className="h-4 w-4 rounded border-charcoal/30 text-chestnut focus:ring-chestnut"
              />
              Feature on the home page
            </label>
            {editError && <p className="text-sm text-rose-600">{editError}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={editSaving} className="btn-primary flex-1 disabled:opacity-60">
                {editSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Save changes</>}
              </button>
              <button type="button" onClick={() => setEditingId(null)} className="btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
