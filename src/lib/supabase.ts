import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase is optional. The site runs fully on bundled seed content until the
 * environment variables are provided. Once the Vercel–Supabase integration is
 * connected (or you add the keys by hand), the same admin dashboard begins
 * persisting to Supabase with no code changes.
 *
 * We read several common variable names so it works whether the keys were set
 * by the Vercel integration (SUPABASE_URL / SUPABASE_ANON_KEY) or added
 * manually as public vars (NEXT_PUBLIC_SUPABASE_URL / …ANON_KEY).
 */

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Read-only client (public anon key). Safe for fetching public content. */
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
