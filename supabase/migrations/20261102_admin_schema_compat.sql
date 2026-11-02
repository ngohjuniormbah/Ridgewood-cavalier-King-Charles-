-- Ridgewood admin schema compatibility migration
-- Run in Supabase SQL Editor after restoring/connecting the project.
-- Adds columns to existing tables too (CREATE TABLE IF NOT EXISTS alone does not).

CREATE TABLE IF NOT EXISTS public.pets (
  id text PRIMARY KEY, name text NOT NULL, breed text NOT NULL DEFAULT 'cavalier',
  colour text NOT NULL DEFAULT '', price numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'available', description text,
  images jsonb NOT NULL DEFAULT '[]'::jsonb, featured boolean NOT NULL DEFAULT false,
  "order" integer DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.pets
  ADD COLUMN IF NOT EXISTS breed text NOT NULL DEFAULT 'cavalier',
  ADD COLUMN IF NOT EXISTS colour text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS price numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'available',
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS images jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

CREATE TABLE IF NOT EXISTS public.reviews (
  id text PRIMARY KEY, author text NOT NULL, location text,
  source text NOT NULL DEFAULT 'google', rating integer NOT NULL DEFAULT 5,
  text text NOT NULL, avatar text, photo text, link text, "order" integer DEFAULT 0
);
ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS author text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'google',
  ADD COLUMN IF NOT EXISTS rating integer NOT NULL DEFAULT 5,
  ADD COLUMN IF NOT EXISTS text text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS avatar text,
  ADD COLUMN IF NOT EXISTS photo text,
  ADD COLUMN IF NOT EXISTS link text,
  ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.gallery (
  id text PRIMARY KEY, title text NOT NULL, caption text, image text NOT NULL,
  category text NOT NULL DEFAULT 'Puppies', "order" integer DEFAULT 0
);
ALTER TABLE public.gallery
  ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS caption text,
  ADD COLUMN IF NOT EXISTS image text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'Puppies',
  ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.messages (
  id text PRIMARY KEY, "fullName" text NOT NULL, email text NOT NULL,
  phone text, address text, puppy text, "hasChildren" boolean DEFAULT false,
  "childrenCount" integer DEFAULT 0, "raisedPetBefore" boolean DEFAULT false,
  "wantsNameChange" boolean DEFAULT false, "newName" text,
  "agreedTerms" boolean DEFAULT false, "acknowledgedFee" boolean DEFAULT false,
  notes text, read boolean DEFAULT false, "createdAt" timestamptz NOT NULL DEFAULT now(),
  "order" integer DEFAULT 0
);
ALTER TABLE public.messages
  ADD COLUMN IF NOT EXISTS "fullName" text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS puppy text,
  ADD COLUMN IF NOT EXISTS "hasChildren" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "childrenCount" integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "raisedPetBefore" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "wantsNameChange" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "newName" text,
  ADD COLUMN IF NOT EXISTS "agreedTerms" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "acknowledgedFee" boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS read boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "createdAt" timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.leads (
  id text PRIMARY KEY, name text NOT NULL, email text NOT NULL, phone text,
  read boolean DEFAULT false, "createdAt" timestamptz NOT NULL DEFAULT now(),
  "order" integer DEFAULT 0
);
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS read boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS "createdAt" timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS "order" integer DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.settings (
  id text PRIMARY KEY DEFAULT 'site', email text, phone text, location text, hours text,
  "reservationFee" integer DEFAULT 250, logo text, facebook text, instagram text,
  tiktok text, announcement text, "nurseryCavalierImage" text, "nurseryCavapooImage" text
);
ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS hours text,
  ADD COLUMN IF NOT EXISTS "reservationFee" integer DEFAULT 250,
  ADD COLUMN IF NOT EXISTS logo text,
  ADD COLUMN IF NOT EXISTS facebook text,
  ADD COLUMN IF NOT EXISTS instagram text,
  ADD COLUMN IF NOT EXISTS tiktok text,
  ADD COLUMN IF NOT EXISTS announcement text,
  ADD COLUMN IF NOT EXISTS "nurseryCavalierImage" text,
  ADD COLUMN IF NOT EXISTS "nurseryCavapooImage" text;

CREATE TABLE IF NOT EXISTS public.content (
  id text PRIMARY KEY DEFAULT 'home', data jsonb NOT NULL DEFAULT '{}'::jsonb
);
ALTER TABLE public.content
  ADD COLUMN IF NOT EXISTS data jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Ensure uploaded admin images have a public bucket.
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Refresh PostgREST's column cache so Supabase recognizes added columns.
NOTIFY pgrst, 'reload schema';
