import type { Metadata } from "next";
import { Playfair_Display, Inter, Parisienne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const script = Parisienne({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ghazala Qureshi | Professional Makeup Artist",
    template: "%s | Ghazala Qureshi",
  },
  description:
    "Bridal, party & event makeup at home or on-location. Look and feel your most beautiful, wherever you are.",
  openGraph: {
    title: "Ghazala Qureshi | Professional Makeup Artist",
    description:
      "Bridal, party & event makeup at home or on-location. Look and feel your most beautiful, wherever you are.",
    type: "website",
    siteName: "Ghazala Qureshi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghazala Qureshi | Professional Makeup Artist",
    description:
      "Bridal, party & event makeup at home or on-location. Look and feel your most beautiful, wherever you are.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ghazala Qureshi Makeup Artist",
    description:
      "Independent freelance makeup artist offering bridal, party and event makeup at home or on-location.",
    url: siteUrl,
    provider: {
      "@type": "Person",
      name: "Ghazala Qureshi",
      jobTitle: "Makeup Artist",
    },
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${script.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-[color:var(--color-text)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
