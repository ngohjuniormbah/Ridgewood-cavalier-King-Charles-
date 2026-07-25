import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { getSettings } from "@/lib/store";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const icon = settings.logo || "/icon.png";
  return {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Cavalier King Charles Spaniel Puppies`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  category: "Pets & Animals",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Cavalier King Charles Spaniel Puppies`,
    description: site.description,
    images: [
      {
        url: "/images/parent-belle-blenheim.jpg",
        width: 1080,
        height: 1350,
        alt: "Ridgewood Cavalier King Charles Spaniel puppy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Cavalier King Charles Spaniel Puppies`,
    description: site.description,
    images: ["/images/parent-belle-blenheim.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: icon,
    shortcut: icon,
    apple: icon,
  },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PetStore",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    email: settings.email,
    image: `${site.url}/images/parent-belle-blenheim.jpg`,
    priceRange: "$$$",
    knowsAbout: [
      "Cavalier King Charles Spaniel",
      "Ethical dog breeding",
      "Puppy health guarantees",
    ],
    sameAs: [settings.facebook, settings.tiktok, settings.instagram].filter(Boolean),
  };

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <Script
          id="ld-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
}
