import "server-only";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { Collection, GalleryItem, Pet, Review, SiteData } from "./types";
import { getSupabaseAdminClient, getSupabaseReadClient, supabaseEnabled } from "./supabase";

import petsSeed from "@/data/pets.json";
import reviewsSeed from "@/data/reviews.json";
import gallerySeed from "@/data/gallery.json";

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
};

const FILE: Record<Collection, string> = {
  pets: "pets.json",
  reviews: "reviews.json",
  gallery: "gallery.json",
};

const TABLE: Record<Collection, string> = {
  pets: "pets",
  reviews: "reviews",
  gallery: "gallery",
};

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
    const client = getSupabaseReadClient();
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

export async function getSiteData(): Promise<SiteData> {
  const [pets, reviews, gallery] = await Promise.all([
    getPets(),
    getReviews(),
    getGallery(),
  ]);
  return { pets, reviews, gallery };
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
