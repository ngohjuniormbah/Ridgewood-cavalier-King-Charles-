// Editable page content (managed from the admin "Content" tab). Stored as a
// singleton, mirroring settings. Falls back to these defaults until edited.

export interface ColourItem {
  name: string;
  image: string;
  desc: string;
}

export interface SiteContent {
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;

  storyEyebrow: string;
  storyTitle: string;
  storyBody: string; // paragraphs separated by blank lines
  storyImage: string;

  coloursTitle: string;
  coloursDescription: string;
  colours: ColourItem[];

  ctaTitle: string;
  ctaText: string;
}

export const defaultContent: SiteContent = {
  heroTitleLine1: "Loved before they",
  heroTitleLine2: "ever come home",
  heroSubtitle:
    "Gentle, health-tested Cavalier King Charles Spaniels raised underfoot in our family home. A signed contract, full health records and lifetime breeder support come with every puppy.",

  storyEyebrow: "Our Story",
  storyTitle: "A family, four cavaliers, and a promise",
  storyBody:
    "Ridgewood began at home with four beloved Cavaliers — our Blenheim girl Belle, ruby Rufus, tricolour Winston and black & tan Duchess. They are not stock; they are family, and their gentle temperaments are the foundation of every litter we raise.\n\nWe are a small, deliberately low-volume breeder. That means fewer litters, more time with each puppy, and the ability to match every family with the right companion for their home.",
  storyImage: "/images/parent-rufus-ruby.jpg",

  coloursTitle: "Every shade of a Cavalier's heart",
  coloursDescription:
    "From the pearl-and-chestnut Blenheim to the deep mahogany Ruby, we raise all four recognised colours of the Cavalier King Charles Spaniel.",
  colours: [
    { name: "Blenheim", image: "/images/parent-belle-blenheim.jpg", desc: "Rich chestnut markings on a pearl-white coat — the breed's signature look." },
    { name: "Ruby", image: "/images/parent-rufus-ruby.jpg", desc: "A warm, solid mahogany-red coat and famously affectionate temperament." },
    { name: "Tricolour", image: "/images/parent-winston-tricolour.jpg", desc: "Bold black-and-white with tan points above the eyes and on the cheeks." },
    { name: "Black & Tan", image: "/images/parent-duchess-black-tan.jpg", desc: "Glossy jet-black feathering with striking, warm tan highlights." },
  ],

  ctaTitle: "Ready to welcome a Ridgewood Cavalier into your home?",
  ctaText:
    "Tell us about your family and we'll help you find the perfect match. We reply to every enquiry personally.",
};
