import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site, siteUrl, skillGroups } from "@/lib/data";
import ScrollProgress from "@/components/ScrollProgress";
import ThreeBackground from "@/components/ThreeBackground";

const display = localFont({
  src: "../public/fonts/space-grotesk-latin.woff2",
  weight: "300 700",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: "../public/fonts/inter-latin.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});

const socialImageUrl = `${siteUrl}/og`;
const socialImageAlt = `Rafshanul Hoque Siam — ${site.role}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      url: siteUrl,
      jobTitle: site.role,
      description: site.seoDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      knowsAbout: [
        ...skillGroups.flatMap((group) => group.skills),
        "Frontend development for AI products",
        "AI-integrated web applications",
        "AI product interface engineering",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: site.name,
      url: siteUrl,
      inLanguage: "en",
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seoTitle,
    template: `%s | ${site.name}`,
  },
  description: site.seoDescription,
  applicationName: `${site.name} Portfolio`,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: site.name }],
  openGraph: {
    title: site.seoTitle,
    description: site.seoDescription,
    url: `${siteUrl}/`,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
    images: [{ url: socialImageUrl, alt: socialImageAlt }],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-base font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-base-deep focus:font-medium"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ScrollProgress />
        <ThreeBackground />
        {children}
      </body>
    </html>
  );
}
