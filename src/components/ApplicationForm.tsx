"use client";

import { useState } from "react";
import { CheckCircle2, PawPrint } from "lucide-react";
import { Field, Label, TextInput, TextArea } from "./admin/fields";

interface Props {
  puppyName?: string;
  reservationFee: number;
  email: string;
}

type Status = "idle" | "sending" | "sent" | "error";

export default function ApplicationForm({ puppyName, reservationFee, email }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [wantsNameChange, setWantsNameChange] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(event.currentTarget);
    const payload = {
      puppy: puppyName ?? String(fd.get("puppy") ?? ""),
      fullName: fd.get("fullName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      address: fd.get("address"),
      hasChildren,
      childrenCount: hasChildren ? Number(fd.get("childrenCount") ?? 0) : 0,
      raisedPetBefore: fd.get("raisedPetBefore") === "yes",
      wantsNameChange,
      newName: wantsNameChange ? String(fd.get("newName") ?? "") : "",
      notes: fd.get("notes"),
      agreedTerms: fd.get("agreedTerms") === "on",
      acknowledgedFee: fd.get("acknowledgedFee") === "on",
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not submit");
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-600" />
        <h2 className="font-serif text-2xl text-ink">Your application has been sent</h2>
        <p className="max-w-md text-charcoal/70">
          Thank you! We&apos;ve received your adoption application{puppyName ? ` for ${puppyName}` : ""} and
          will review it personally. We&apos;ll be in touch by email to confirm the next steps,
          including your <strong>${reservationFee} reservation fee</strong>.
        </p>
        <p className="text-sm text-charcoal/50">
          Any questions in the meantime? Email us at{" "}
          <a href={`mailto:${email}`} className="font-medium text-chestnut">{email}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {puppyName && (
        <div className="flex items-center gap-3 rounded-2xl bg-chestnut/10 px-5 py-4 text-chestnut">
          <PawPrint className="h-5 w-5" />
          <p className="text-sm font-medium">
            You&apos;re applying to adopt <span className="font-semibold">{puppyName}</span>.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name *">
          <TextInput name="fullName" required autoComplete="name" />
        </Field>
        <Field label="Email *">
          <TextInput name="email" type="email" required autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone number *">
          <TextInput name="phone" type="tel" required autoComplete="tel" />
        </Field>
        {!puppyName && (
          <Field label="Which puppy are you interested in?">
            <TextInput name="puppy" placeholder="Puppy name, colour, or 'upcoming litter'" />
          </Field>
        )}
      </div>

      <Field label="Home address (location) *">
        <TextArea name="address" rows={2} required placeholder="Street, city, state / region, country" />
      </Field>

      {/* Children */}
      <div className="rounded-2xl border border-charcoal/10 bg-cream p-5">
        <Label>Do you have children in the home?</Label>
        <div className="mt-2 flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="hasChildrenRadio" checked={hasChildren} onChange={() => setHasChildren(true)} className="text-chestnut focus:ring-chestnut" />
            Yes
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="hasChildrenRadio" checked={!hasChildren} onChange={() => setHasChildren(false)} className="text-chestnut focus:ring-chestnut" />
            No
          </label>
          {hasChildren && (
            <div className="flex items-center gap-2">
              <Label>How many?</Label>
              <input
                type="number"
                name="childrenCount"
                min={1}
                max={20}
                defaultValue={1}
                className="w-20 rounded-xl border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus:border-chestnut focus:ring-2 focus:ring-chestnut/20"
              />
            </div>
          )}
        </div>
      </div>

      {/* Prior pet */}
      <div className="rounded-2xl border border-charcoal/10 bg-cream p-5">
        <Label>Have you raised a pet before?</Label>
        <div className="mt-2 flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="raisedPetBefore" value="yes" defaultChecked className="text-chestnut focus:ring-chestnut" /> Yes
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="raisedPetBefore" value="no" className="text-chestnut focus:ring-chestnut" /> No
          </label>
        </div>
      </div>

      {/* Name change */}
      <div className="rounded-2xl border border-charcoal/10 bg-cream p-5">
        <Label>Would you like to change the puppy&apos;s name?</Label>
        <div className="mt-2 flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="nameChangeRadio" checked={wantsNameChange} onChange={() => setWantsNameChange(true)} className="text-chestnut focus:ring-chestnut" /> Yes
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="nameChangeRadio" checked={!wantsNameChange} onChange={() => setWantsNameChange(false)} className="text-chestnut focus:ring-chestnut" /> No, keep the name
          </label>
          {wantsNameChange && (
            <input
              type="text"
              name="newName"
              placeholder="New name"
              className="min-w-[10rem] flex-1 rounded-xl border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus:border-chestnut focus:ring-2 focus:ring-chestnut/20"
            />
          )}
        </div>
      </div>

      <Field label="Anything else you'd like us to know?">
        <TextArea name="notes" rows={3} placeholder="Your home, routine, and why a Cavalier is right for you…" />
      </Field>

      {/* Reservation fee notice */}
      <div className="rounded-2xl border border-gold/40 bg-gold/10 p-5 text-sm text-ink">
        <p className="font-semibold">Reservation fee</p>
        <p className="mt-1 text-charcoal/75">
          A non-refundable reservation fee of <strong>${reservationFee}</strong> is required to hold
          your puppy. Once we review your application we&apos;ll email you the secure payment details.
          The reservation fee is deducted from the total price of your puppy.
        </p>
      </div>

      {/* Agreements */}
      <label className="flex items-start gap-3 text-sm text-charcoal/80">
        <input type="checkbox" name="agreedTerms" required className="mt-0.5 h-4 w-4 rounded border-charcoal/30 text-chestnut focus:ring-chestnut" />
        I have read and agree to the adoption <strong>terms and conditions</strong>, including the
        health guarantee and responsible-ownership commitments.
      </label>
      <label className="flex items-start gap-3 text-sm text-charcoal/80">
        <input type="checkbox" name="acknowledgedFee" required className="mt-0.5 h-4 w-4 rounded border-charcoal/30 text-chestnut focus:ring-chestnut" />
        I understand a <strong>${reservationFee} reservation fee</strong> is required to reserve my puppy.
      </label>

      {status === "error" && (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send application"}
      </button>
      <p className="text-center text-xs text-charcoal/50">
        Your details are kept private and used only to process your adoption enquiry.
      </p>
    </form>
  );
}
