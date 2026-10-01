-- Keep the live pets.status column compatible with the Admin status selector.
-- Safe to run against an existing production table.

ALTER TABLE public.pets
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'available';

-- Normalize common legacy values before applying the canonical constraint.
UPDATE public.pets
SET status = CASE
  WHEN LOWER(TRIM(status)) IN ('available', 'available now') THEN 'available'
  WHEN LOWER(TRIM(status)) IN ('reserved', 'reserve') THEN 'reserved'
  WHEN LOWER(TRIM(status)) IN ('adopted', 'adopt', 'sold') THEN 'adopted'
  WHEN LOWER(TRIM(status)) IN ('cancelled', 'canceled', 'cancel') THEN 'cancelled'
  ELSE 'available'
END;

-- Remove existing CHECK constraints on pets that reference status. This avoids
-- conflicts with an older three-state constraint left by an earlier schema.
DO $$
DECLARE
  constraint_record record;
BEGIN
  FOR constraint_record IN
    SELECT con.conname
    FROM pg_constraint con
    JOIN pg_class rel ON rel.oid = con.conrelid
    JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
    WHERE nsp.nspname = 'public'
      AND rel.relname = 'pets'
      AND con.contype = 'c'
      AND pg_get_constraintdef(con.oid) ILIKE '%status%'
  LOOP
    EXECUTE format('ALTER TABLE public.pets DROP CONSTRAINT IF EXISTS %I', constraint_record.conname);
  END LOOP;
END $$;

ALTER TABLE public.pets
  ADD CONSTRAINT pets_status_check
  CHECK (status IN ('available', 'reserved', 'adopted', 'cancelled'));

NOTIFY pgrst, 'reload schema';
