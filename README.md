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
  linked, excluded from robots & sitemap). Manage puppies, reviews and the
  gallery, and **upload photos straight from a computer or phone** — no image
  URLs required.
- **Reviews** support a reviewer profile picture, an in-review photo and a link,
  a selectable source badge (**Google / Facebook / TikTok**), and carry **no
  date**, exactly as requested.
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

## Add Supabase (when you're ready)

1. Create a Supabase project.
2. In the SQL editor, run [`supabase/schema.sql`](./supabase/schema.sql) — it
   creates the `pets`, `reviews` and `gallery` tables and a public `media`
   storage bucket.
3. Add these environment variables in Vercel (and `.env.local` for local use):

   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

4. Redeploy. The dashboard now reads and writes to Supabase, and uploads go to
   Supabase Storage — no code changes needed.

---

## Editing business details

All contact details, navigation and SEO keywords live in one file:
[`src/lib/site.ts`](./src/lib/site.ts). Update them there and they change
everywhere.

Parent-dog photography lives in [`images/`](./images) (originals) and
[`public/images/`](./public/images) (used by the site).

---

## Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion ·
lucide-react · Supabase (optional).
