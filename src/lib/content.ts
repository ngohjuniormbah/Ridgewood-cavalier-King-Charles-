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

  // About page
  aboutTitle: string;
  aboutBody: string; // paragraphs separated by blank lines
  aboutImage: string;

  // Guarantee page
  guaranteeTitle: string;
  guaranteeIntro: string;
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

  aboutTitle: "Devoted to one wonderful breed",
  aboutBody:
    "We are not a large operation, and we never want to be. Ridgewood is a family home where Cavalier King Charles Spaniels are loved as they were always meant to be — as companions, first and always.\n\nEverything we do is guided by a simple standard: would we be happy to keep this puppy ourselves? If the answer is anything but a wholehearted yes, we don't place it. That is our quiet promise to every family who chooses us.\n\nWhen you bring home a Ridgewood Cavalier, you're not completing a transaction — you're joining a small community of families who share a love for this gentle, devoted breed.",
  aboutImage: "/images/parent-winston-tricolour.jpg",

  guaranteeTitle: "A genuine two-year health guarantee",
  guaranteeIntro:
    "We stand behind the health of every puppy we raise. Here is exactly what that promise means for you.",
};
