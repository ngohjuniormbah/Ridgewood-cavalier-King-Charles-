"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Trash2, PawPrint, Check, Users, Dog, Tag } from "lucide-react";
import type { Message } from "@/lib/types";
import { deleteItem, updateItem } from "./api";

export default function MessagesManager({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function toggleRead(m: Message) {
    setBusy(m.id);
    await updateItem("messages", m.id, { read: !m.read });
    router.refresh();
    setBusy(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this application?")) return;
    setBusy(id);
    await deleteItem("messages", id);
    router.refresh();
    setBusy(null);
  }

  if (messages.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-charcoal/20 p-10 text-center text-sm text-charcoal/60">
        No applications yet. Adoption applications submitted from the website will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <article
          key={m.id}
          className={`rounded-2xl border bg-white p-6 shadow-soft transition ${
            m.read ? "border-charcoal/10" : "border-chestnut/40 ring-1 ring-chestnut/10"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl text-ink">{m.fullName}</h3>
                {!m.read && (
                  <span className="rounded-full bg-chestnut px-2 py-0.5 text-[0.65rem] font-semibold text-cream">
                    New
                  </span>
                )}
              </div>
              {m.createdAt && (
                <p className="text-xs text-charcoal/50">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleRead(m)}
                disabled={busy === m.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-charcoal/15 px-3 py-1.5 text-xs font-medium text-charcoal/70 hover:border-chestnut hover:text-chestnut"
              >
                <Check className="h-3.5 w-3.5" /> {m.read ? "Mark unread" : "Mark read"}
              </button>
              <button
                onClick={() => remove(m.id)}
                disabled={busy === m.id}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-charcoal/50 hover:bg-rose-50 hover:text-rose-600"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-charcoal/75 sm:grid-cols-2">
            <a href={`mailto:${m.email}`} className="inline-flex items-center gap-2 hover:text-chestnut">
              <Mail className="h-4 w-4 text-caramel" /> {m.email}
            </a>
            <a href={`tel:${m.phone}`} className="inline-flex items-center gap-2 hover:text-chestnut">
              <Phone className="h-4 w-4 text-caramel" /> {m.phone}
            </a>
            <p className="inline-flex items-start gap-2 sm:col-span-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" /> {m.address}
            </p>
            {m.puppy && (
              <p className="inline-flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-caramel" /> Interested in: <strong>{m.puppy}</strong>
              </p>
            )}
            <p className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-caramel" />
              Children: {m.hasChildren ? `Yes (${m.childrenCount})` : "No"}
            </p>
            <p className="inline-flex items-center gap-2">
              <Dog className="h-4 w-4 text-caramel" />
              Raised a pet before: {m.raisedPetBefore ? "Yes" : "No"}
            </p>
            <p className="inline-flex items-center gap-2">
              <Tag className="h-4 w-4 text-caramel" />
              Name change: {m.wantsNameChange ? `Yes → ${m.newName || "(not given)"}` : "No"}
            </p>
          </div>

          {m.notes && (
            <p className="mt-4 rounded-xl bg-cream px-4 py-3 text-sm text-charcoal/70">{m.notes}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-charcoal/50">
            <span className={m.agreedTerms ? "text-emerald-600" : ""}>
              {m.agreedTerms ? "✓" : "✗"} Agreed to terms
            </span>
            <span className={m.acknowledgedFee ? "text-emerald-600" : ""}>
              {m.acknowledgedFee ? "✓" : "✗"} Acknowledged reservation fee
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
