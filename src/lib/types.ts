// Shared domain types for Ridgewood Cavalier King Charles.

export type PetColour =
  | "Blenheim"
  | "Tricolour"
  | "Ruby"
  | "Black & Tan";

export type PetStatus = "available" | "reserved" | "cancelled" | "sold";

export interface Pet {
  id: string;
  name: string;
  colour: PetColour;
  gender: "Male" | "Female";
  birthDate: string; // ISO date — used to compute readiness, not shown as a post date
  price: number;
  status: PetStatus;
  description: string;
  images: string[];
  featured?: boolean;
  order?: number;
}

export type ReviewSource = "google" | "facebook" | "tiktok";

export interface Review {
  id: string;
  author: string;
  location?: string;
  source: ReviewSource;
  rating: number; // 1–5
  text: string;
  avatar?: string; // reviewer profile picture
  photo?: string; // an optional picture attached inside the review
  link?: string; // an optional link inside the review
  order?: number;
  // Note: reviews intentionally carry NO date.
}

export type GalleryCategory =
  | "Puppies"
  | "Parents"
  | "Families"
  | "Life at Ridgewood";

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  image: string;
  category: GalleryCategory;
  order?: number;
}

export interface SiteData {
  pets: Pet[];
  reviews: Review[];
  gallery: GalleryItem[];
}

export type Collection = keyof SiteData;
