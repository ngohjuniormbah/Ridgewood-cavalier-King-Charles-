-- ===========================================================================
-- Ridgewood Cavalier King Charles — Supabase schema
-- Run this in the Supabase SQL editor once you are ready to persist content
-- online. Until then the site runs from the bundled seed data.
-- ===========================================================================

-- Puppies / available pets ---------------------------------------------------
create table if not exists public.pets (
  id           text primary key,
  name         text not null,
  colour       text not null,
  price        numeric not null default 0,
  status       text not null default 'available',
  description  text,
  images       jsonb not null default '[]'::jsonb,
  featured     boolean not null default false,
  "order"      integer default 0,
  created_at   timestamptz not null default now()
);

-- Reviews (intentionally have no date) --------------------------------------
create table if not exists public.reviews (
  id        text primary key,
  author    text not null,
  location  text,
  source    text not null default 'google',   -- google | facebook | tiktok
  rating    integer not null default 5,
  text      text not null,
  avatar    text,
  photo     text,
  link      text,
  "order"   integer default 0
);

-- Gallery --------------------------------------------------------------------
create table if not exists public.gallery (
  id        text primary key,
  title     text not null,
  caption   text,
  image     text not null,
  category  text not null default 'Puppies',
  "order"   integer default 0
);

-- Adoption applications / messages ------------------------------------------
create table if not exists public.messages (
  id                text primary key,
  "fullName"        text not null,
  email             text not null,
  phone             text,
  address           text,
  puppy             text,
  "hasChildren"     boolean default false,
  "childrenCount"   integer default 0,
  "raisedPetBefore" boolean default false,
  "wantsNameChange" boolean default false,
  "newName"         text,
  "agreedTerms"     boolean default false,
  "acknowledgedFee" boolean default false,
  notes             text,
  read              boolean default false,
  "createdAt"       timestamptz not null default now(),
  "order"           integer default 0
);

-- Editable site settings (single row) ---------------------------------------
create table if not exists public.settings (
  id              text primary key default 'site',
  email           text,
  phone           text,
  location        text,
  hours           text,
  "reservationFee" integer default 250,
  logo            text,
  facebook        text,
  instagram       text,
  tiktok          text,
  announcement    text
);

-- Row Level Security ---------------------------------------------------------
-- Public visitors may read; all writes go through the server using the
-- service-role key (which bypasses RLS), so no write policy is needed.
alter table public.pets     enable row level security;
alter table public.reviews  enable row level security;
alter table public.gallery  enable row level security;
alter table public.messages enable row level security;
alter table public.settings enable row level security;

-- Public visitors may read catalogue content and settings, but NOT messages
-- (adoption applications stay private; only the server's service-role key,
-- which bypasses RLS, can read them).
create policy "Public read pets"     on public.pets     for select using (true);
create policy "Public read reviews"  on public.reviews  for select using (true);
create policy "Public read gallery"  on public.gallery  for select using (true);
create policy "Public read settings" on public.settings for select using (true);

-- Storage bucket for admin uploads ------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');
