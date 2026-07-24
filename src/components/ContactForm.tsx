"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        <h3 className="font-serif text-2xl text-ink">Thank you — your enquiry is on its way</h3>
        <p className="max-w-md text-charcoal/70">
          We&apos;ve received your message and will reply personally, usually within a day.
          For anything urgent, call us on{" "}
          <a href={site.phoneHref} className="font-medium text-chestnut">{site.phone}</a>.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-ghost mt-2">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal/80" htmlFor="interest">
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-chestnut focus:ring-2 focus:ring-chestnut/20"
          >
            <option>An available puppy</option>
            <option>Joining the waiting list</option>
            <option>Arranging a visit</option>
            <option>A general question</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-charcoal/80" htmlFor="message">
          Tell us about your family
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Your home, your routine, and the companion you're hoping for…"
          className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-chestnut focus:ring-2 focus:ring-chestnut/20"
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Something went wrong. Please try again or call us on {site.phone}.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : (<>Send enquiry <Send className="h-4 w-4" /></>)}
      </button>
      <p className="text-center text-xs text-charcoal/50">
        We reply to every enquiry personally and never share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal/80" htmlFor={name}>
        {label} {required && <span className="text-chestnut">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-chestnut focus:ring-2 focus:ring-chestnut/20"
      />
    </div>
  );
}
