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

export interface Message {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  puppy?: string; // which puppy they're applying for, if any
  hasChildren: boolean;
  childrenCount: number;
  raisedPetBefore: boolean;
  wantsNameChange: boolean;
  newName?: string;
  agreedTerms: boolean;
  acknowledgedFee: boolean;
  notes?: string;
  read?: boolean;
  createdAt: string; // received timestamp — for the admin inbox only
  order?: number;
}

export interface Settings {
  email: string;
  phone: string;
  location: string;
  hours: string;
  reservationFee: number;
  logo: string; // uploaded brand logo (used in the header and as the favicon)
  facebook: string;
  instagram: string;
  tiktok: string;
  announcement: string;
}

/** Collections are array-backed; settings is a singleton object. */
export interface SiteData {
  pets: Pet[];
  reviews: Review[];
  gallery: GalleryItem[];
  messages: Message[];
}

export type Collection = keyof SiteData;
