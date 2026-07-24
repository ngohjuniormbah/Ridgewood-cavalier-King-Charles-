import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase is optional. The site runs fully on bundled seed content until
 * these environment variables are provided (see .env.example). Once you add
 * them in Vercel, the same admin dashboard begins persisting to Supabase with
 * no code changes.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Read-only client (public anon key). Safe to use for fetching content. */
export function getSupabaseReadClient(): SupabaseClient | null {
  if (!supabaseEnabled) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

/**
 * Privileged client (service role) for admin writes and Storage uploads.
 * Only ever imported from server-side code (API routes).
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
  });
}
