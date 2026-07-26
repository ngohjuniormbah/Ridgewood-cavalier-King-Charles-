import "server-only";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type {
  Collection,
  GalleryItem,
  Message,
  Pet,
  Review,
  Settings,
  SiteData,
} from "./types";
import {
  getSupabaseAdminClient,
  getSupabaseServerClient,
  supabaseEnabled,
} from "./supabase";
import { defaultSettings } from "./site";
import { defaultContent, type SiteContent } from "./content";

import petsSeed from "@/data/pets.json";
import reviewsSeed from "@/data/reviews.json";
import gallerySeed from "@/data/gallery.json";
import messagesSeed from "@/data/messages.json";
import settingsSeed from "@/data/settings.json";

/**
 * Content store with two backends:
 *
 *   1. Supabase  — used automatically when the environment variables are set.
 *   2. JSON files — the default. Reads always succeed from bundled seed data;
 *      writes persist to the JSON files in development. This lets the whole
 *      site (and admin dashboard) work on Vercel before Supabase is wired in.
 */

const DATA_DIR = path.join(process.cwd(), "src", "data");

const SEED: Record<Collection, unknown[]> = {
  pets: petsSeed as Pet[],
  reviews: reviewsSeed as Review[],
  gallery: gallerySeed as GalleryItem[],
  messages: messagesSeed as Message[],
};

const FILE: Record<Collection, string> = {
  pets: "pets.json",
  reviews: "reviews.json",
  gallery: "gallery.json",
  messages: "messages.json",
};

const TABLE: Record<Collection, string> = {
  pets: "pets",
  reviews: "reviews",
  gallery: "gallery",
  messages: "messages",
};

const SETTINGS_FILE = "settings.json";
const SETTINGS_TABLE = "settings";
const SETTINGS_ID = "site";

const CONTENT_FILE = "content.json";
const CONTENT_TABLE = "content";
const CONTENT_ID = "home";

async function readFile<T>(collection: Collection): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, FILE[collection]), "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    // Bundled seed as a last resort (e.g. read-only serverless filesystem).
    return SEED[collection] as T[];
  }
}

async function writeFile<T>(collection: Collection, rows: T[]): Promise<void> {
  await fs.writeFile(
    path.join(DATA_DIR, FILE[collection]),
    JSON.stringify(rows, null, 2) + "\n",
    "utf8",
  );
}

function sortByOrder<T extends { order?: number }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

async function readCollection<T extends { order?: number }>(
  collection: Collection,
): Promise<T[]> {
  if (supabaseEnabled) {
    const client = getSupabaseServerClient();
    if (client) {
      const { data, error } = await client.from(TABLE[collection]).select("*");
      if (!error && data) return sortByOrder(data as T[]);
    }
  }
  return sortByOrder(await readFile<T>(collection));
}

export async function getPets(): Promise<Pet[]> {
  return readCollection<Pet>("pets");
}

export async function getReviews(): Promise<Review[]> {
  return readCollection<Review>("reviews");
}

export async function getGallery(): Promise<GalleryItem[]> {
  return readCollection<GalleryItem>("gallery");
}

export async function getMessages(): Promise<Message[]> {
  const messages = await readCollection<Message>("messages");
  // Newest first for the inbox.
  return [...messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getSiteData(): Promise<SiteData> {
  const [pets, reviews, gallery, messages] = await Promise.all([
    getPets(),
    getReviews(),
    getGallery(),
    getMessages(),
  ]);
  return { pets, reviews, gallery, messages };
}

// --- Settings (singleton) --------------------------------------------------

export async function getSettings(): Promise<Settings> {
  if (supabaseEnabled) {
    const client = getSupabaseServerClient();
    if (client) {
      const { data, error } = await client
        .from(SETTINGS_TABLE)
        .select("*")
        .eq("id", SETTINGS_ID)
        .maybeSingle();
      if (!error && data) return mergeSettings(data as Partial<Settings>);
    }
  }
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, SETTINGS_FILE), "utf8");
    return mergeSettings(JSON.parse(raw) as Partial<Settings>);
  } catch {
    return mergeSettings(settingsSeed as Partial<Settings>);
  }
}

/**
 * Merge stored settings over the defaults, but treat empty strings as "unset"
 * so a blank stored value falls back to the default (e.g. the default social
 * links still appear if a stored row left them empty).
 */
function mergeSettings(stored: Partial<Settings>): Settings {
  const result = { ...defaultSettings };
  (Object.keys(stored) as (keyof Settings)[]).forEach((key) => {
    const value = stored[key];
    if (value === undefined || value === null) return;
    if (typeof value === "string" && value.trim() === "") return;
    // @ts-expect-error — key/value are correlated at runtime
    result[key] = value;
  });
  return result;
}

export async function updateSettings(patch: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const next: Settings = { ...current, ...patch };

  const admin = getSupabaseAdminClient();
  if (admin) {
    const { error } = await admin
      .from(SETTINGS_TABLE)
      .upsert({ id: SETTINGS_ID, ...next });
    if (error) throw new Error(error.message);
    return next;
  }

  await fs.writeFile(
    path.join(DATA_DIR, SETTINGS_FILE),
    JSON.stringify(next, null, 2) + "\n",
    "utf8",
  );
  return next;
}

// --- Editable page content (singleton) -------------------------------------

export async function getContent(): Promise<SiteContent> {
  if (supabaseEnabled) {
    const client = getSupabaseServerClient();
    if (client) {
      const { data, error } = await client
        .from(CONTENT_TABLE)
        .select("*")
        .eq("id", CONTENT_ID)
        .maybeSingle();
      if (!error && data?.data) return { ...defaultContent, ...(data.data as Partial<SiteContent>) };
    }
  }
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, CONTENT_FILE), "utf8");
    return { ...defaultContent, ...(JSON.parse(raw) as Partial<SiteContent>) };
  } catch {
    return defaultContent;
  }
}

export async function updateContent(patch: Partial<SiteContent>): Promise<SiteContent> {
  const current = await getContent();
  const next: SiteContent = { ...current, ...patch };

  const admin = getSupabaseAdminClient();
  if (admin) {
    // Stored as a single JSON column so the shape can evolve freely.
    const { error } = await admin.from(CONTENT_TABLE).upsert({ id: CONTENT_ID, data: next });
    if (error) throw new Error(error.message);
    return next;
  }

  await fs.writeFile(
    path.join(DATA_DIR, CONTENT_FILE),
    JSON.stringify(next, null, 2) + "\n",
    "utf8",
  );
  return next;
}

// --- Admin write operations ------------------------------------------------

type WithId = { id: string; order?: number };

export async function createItem<T extends Partial<WithId>>(
  collection: Collection,
  input: T,
): Promise<WithId> {
  const record = { ...input, id: input.id ?? randomUUID() } as WithId;

  const admin = getSupabaseAdminClient();
  if (admin) {
    const { data, error } = await admin
      .from(TABLE[collection])
      .insert(record)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as WithId;
  }

  const rows = await readFile<WithId>(collection);
  record.order = record.order ?? rows.length + 1;
  rows.push(record);
  await writeFile(collection, rows);
  return record;
}

export async function updateItem(
  collection: Collection,
  id: string,
  patch: Record<string, unknown>,
): Promise<WithId> {
  const admin = getSupabaseAdminClient();
  if (admin) {
    const { data, error } = await admin
      .from(TABLE[collection])
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as WithId;
  }

  const rows = await readFile<WithId>(collection);
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) throw new Error("Item not found");
  rows[index] = { ...rows[index], ...patch, id };
  await writeFile(collection, rows);
  return rows[index];
}

export async function deleteItem(collection: Collection, id: string): Promise<void> {
  const admin = getSupabaseAdminClient();
  if (admin) {
    const { error } = await admin.from(TABLE[collection]).delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }

  const rows = await readFile<WithId>(collection);
  await writeFile(
    collection,
    rows.filter((row) => row.id !== id),
  );
}
