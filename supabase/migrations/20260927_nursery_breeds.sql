-- Ridgewood Nursery update: persist pet breed and the two Nursery card images.
-- Safe to run against an existing database.

alter table public.pets
  add column if not exists breed text not null default 'cavalier';

alter table public.settings
  add column if not exists "nurseryCavalierImage" text;

alter table public.settings
  add column if not exists "nurseryCavapooImage" text;

-- Existing pets are treated as Cavaliers so the current catalogue does not disappear.
update public.pets
set breed = 'cavalier'
where breed is null or trim(breed) = '';
