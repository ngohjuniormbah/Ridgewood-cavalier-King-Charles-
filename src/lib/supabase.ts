import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase is optional. The site runs on bundled seed content until the
 * environment variables are provided. We read several common variable names so
 * it works whether the keys were set by the Vercel–Supabase integration
 * (SUPABASE_URL / SUPABASE_ANON_KEY) or manually (NEXT_PUBLIC_… names).
 */

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseEnabled = Boolean(SUPABASE_URL && (SUPABASE_ANON_KEY || SUPABASE_SERVICE_KEY));

// Always fetch fresh data — never let Next.js cache Supabase reads, so content
// added in the admin appears on the site immediately.
const noStoreFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

/** Anon (public) client. */
export function getSupabaseReadClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: { fetch: noStoreFetch },
  });
}

/**
 * Privileged client (service role) for admin writes, uploads — and for reads
 * from server components, so the public site never depends on RLS policies and
 * always shows exactly what the admin shows. Server-side only.
 */
export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false },
    global: { fetch: noStoreFetch },
  });
}

/** Best available server-side client for reads: service role if set, else anon. */
export function getSupabaseServerClient(): SupabaseClient | null {
  return getSupabaseAdminClient() ?? getSupabaseReadClient();
}
