import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const SITE_URL = "https://qodix.studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QODIX Studio — Building Beyond Digital.",
    template: "%s — QODIX Studio",
  },
  description:
    "QODIX is an independent digital technology studio transforming ambitious ideas into modern websites, intelligent software, AI-powered solutions and scalable digital products. Building Beyond Digital.",
  keywords: [
    "QODIX",
    "QODIX Studio",
    "digital technology studio",
    "software development",
    "web development",
    "AI solutions",
    "UI/UX design",
    "custom software",
    "business automation",
    "digital products",
    "India",
  ],
  authors: [{ name: "QODIX Studio" }],
  creator: "QODIX Studio",
  alternates: { canonical: "/" },
  openGraph: {
    title: "QODIX Studio — Building Beyond Digital.",
    description:
      "Independent digital technology studio. Websites, intelligent software, AI-powered solutions and digital products built for what comes next.",
    url: SITE_URL,
    siteName: "QODIX Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QODIX Studio — Building Beyond Digital.",
    description:
      "Independent digital technology studio. Websites, intelligent software, AI-powered solutions and digital products built for what comes next.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QODIX Studio",
  alternateName: "QODIX",
  url: SITE_URL,
  slogan: "Building Beyond Digital.",
  description:
    "Independent digital technology studio building websites, intelligent software, AI-powered solutions and scalable digital products.",
  founder: { "@type": "Person", name: "Abhiishek" },
  areaServed: ["IN", "Worldwide"],
  knowsAbout: [
    "Website Development",
    "UI/UX Design",
    "Custom Software",
    "AI Solutions",
    "Business Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="grain">
      <body
        className={`${bebas.variable} ${grotesk.variable} ${cormorant.variable} antialiased bg-ink text-hi`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
