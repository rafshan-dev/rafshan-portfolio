import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { site, siteUrl, skillGroups } from "@/lib/data";
import ScrollProgress from "@/components/ScrollProgress";
import ThreeBackground from "@/components/ThreeBackground";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      knowsAbout: skillGroups.flatMap((group) => group.skills),
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
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.seoDescription,
  applicationName: `${site.name} Portfolio`,
  alternates: {
    canonical: `${siteUrl}/`,
  },
  keywords: [
    "Rafshanul Hoque Siam",
    "Senior Software Engineer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "Bangladesh Software Engineer",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} | ${site.role}`,
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
    title: `${site.name} | ${site.role}`,
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
