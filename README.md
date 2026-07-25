# Ridgewood Cavalier King Charles

A full-stack website for **Ridgewood Cavalier King Charles**, a small, ethical
Cavalier King Charles Spaniel breeder. Built with **Next.js (App Router),
TypeScript, Node.js and Tailwind CSS**, with a private admin dashboard and an
optional Supabase backend.

---

## Highlights

- **Elegant, responsive design** in a warm chestnut / caramel / cream palette
  drawn from the dogs themselves, with smooth scroll and hover animations
  (Framer Motion) and full mobile support.
- **Public pages:** Home, Puppies (available / reserved / cancelled / placed),
  Parent Dogs & origin story, Adoption, 2-Year Guarantee, Gallery, Reviews,
  About and Contact.
- **SEO-first:** per-page metadata and keywords, Open Graph & Twitter cards,
  `sitemap.xml`, `robots.txt`, and JSON-LD structured data (LocalBusiness,
  AggregateRating + Reviews, FAQ) to help rank for Cavalier breeder searches.
- **Private admin dashboard** reachable **by URL only** at `/admin` (never
  linked, excluded from robots & sitemap) with five sections: **Puppies**,
  **Reviews**, **Gallery**, **Applications** (inbox) and **Settings**. Photos
  **upload straight from a computer or phone** — no image URLs required.
- **Adoption application form** (`/apply`): clicking an available puppy opens a
  form asking full name, email, phone, address, whether they have children and
  how many, whether they've raised a pet before, whether they'd like to change
  the puppy's name, and requiring agreement to the terms and a **$250
  reservation fee** — submissions land in the admin **Applications** inbox.
- **Reviews** support a reviewer profile picture, an in-review photo and a link,
  a selectable source badge (**Google / Facebook / TikTok**), and carry **no
  date**, exactly as requested.
- **Settings tab** to edit the contact email, phone, socials, announcement bar
  and reservation fee — applied across the whole site.
- **Supabase-ready:** runs today from bundled seed content; add your Supabase
  keys later and the same dashboard persists to the cloud with no code changes.

---

## Getting started (local development)

```bash
npm install
cp .env.example .env.local      # then edit the values
npm run dev                     # http://localhost:3000
```

Set at least these in `.env.local`:

```
ADMIN_PASSWORD=your-long-secret
ADMIN_SESSION_SECRET=another-long-random-string
```

Then open **http://localhost:3000/admin** and sign in with `ADMIN_PASSWORD`.

---

## The admin dashboard

- Visit **`/admin`** directly (it is intentionally not in the navigation).
- Sign in with your `ADMIN_PASSWORD`.
- Three sections:
  - **Puppies & Pets** — add a puppy with photos, colour, gender, price and a
    status of *available*, *reserved*, *cancelled* or *placed*. Change any
    puppy's status inline.
  - **Reviews** — add the reviewer's profile picture, name, an optional photo
    inside the review, an optional link, a star rating, and choose whether the
    review is shown as coming from Google, Facebook or TikTok. Reviews have no
    date.
  - **Gallery** — upload photos with a title, caption and category.
- Every image field uploads a file from your device (the phone file picker also
  offers the camera). Nothing is pasted as a URL.

---

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Import** the repository (Next.js is detected automatically).
3. Add Environment Variables → `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.
4. Deploy.

The site is fully functional immediately, serving the bundled seed content.

> **Note on persistence:** without Supabase, admin changes and uploads persist
> only in local development (Vercel's filesystem is read-only). The dashboard
> shows a "Preview mode" banner until Supabase is connected — see below.

---

## Add Supabase (via the Vercel integration)

**Step 1 — Create the Supabase database from Vercel.**
In your Vercel project, open the **Storage** tab → **Create Database** →
**Supabase** → follow the prompts. Vercel provisions a Supabase project and
automatically adds the connection environment variables (including
`SUPABASE_URL`, `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`) to your
project. The app reads those names automatically — nothing to copy by hand.

**Step 2 — Create the tables and storage bucket.**
Open your new project at [supabase.com](https://supabase.com) → **SQL Editor**
→ paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) → **Run**.
This creates the `pets`, `reviews`, `gallery`, `messages` and `settings` tables
plus a public `media` storage bucket for uploads.

**Step 3 — Confirm the service-role key is present.**
In Vercel → **Settings → Environment Variables**, check that
`SUPABASE_SERVICE_ROLE_KEY` exists (the integration adds it). This is what lets
the admin dashboard save changes and upload images. If it's missing, copy it
from Supabase → **Project Settings → API → `service_role` secret** and add it.

**Step 4 — Redeploy.**
Vercel → **Deployments → Redeploy**. Done — the admin dashboard now reads and
writes to Supabase, and photo uploads go to Supabase Storage. The "Preview mode"
banner in the admin disappears once persistence is live.

> Prefer to do it manually? Create a Supabase project yourself, run the schema,
> then add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
> `SUPABASE_SERVICE_ROLE_KEY` in Vercel. The app accepts either naming.

---

## Editing business details

Contact email, phone, socials, announcement bar and reservation fee are edited
from the admin **Settings** tab. Brand name, navigation and SEO keyword defaults
live in [`src/lib/site.ts`](./src/lib/site.ts).

Parent-dog photography lives in [`images/`](./images) (originals) and
[`public/images/`](./public/images) (used by the site).

**Logo:** upload your logo image in the admin **Settings → Brand logo** tab
(from your computer or phone) — it becomes both the header logo and the browser
favicon automatically. If no logo is uploaded, a grey serif "Ridgewood /
Cavalier King Charles" wordmark is used. (Uploads persist online once Supabase
is connected.)

---

## Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion ·
lucide-react · Supabase (optional).
