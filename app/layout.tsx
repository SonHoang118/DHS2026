import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SiteChrome from "@/components/SiteChrome";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Công Ty Thiết Kế & Thi Công Kiến Trúc DHStudio",
    template: "%s | DHStudio",
  },
  description: "Giải pháp kiến trúc toàn diện từ thiết kế đến thi công. Với kinh nghiệm dày dặn trong lĩnh vực kiến trúc và xây dựng.",
  keywords: [
    "DHStudio",
    "kiến trúc",
    "thiết kế kiến trúc",
    "thi công",
    "xây dựng",
    "tư vấn kiến trúc",
    "thiết kế nội thất",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "DHStudio",
    title: "Công Ty Thiết Kế & Thi Công Kiến Trúc DHStudio",
    description:
      "Giải pháp kiến trúc toàn diện từ thiết kế đến thi công. Với kinh nghiệm dày dặn trong lĩnh vực kiến trúc và xây dựng.",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "DHStudio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Công Ty Thiết Kế & Thi Công Kiến Trúc DHStudio",
    description:
      "Giải pháp kiến trúc toàn diện từ thiết kế đến thi công. Với kinh nghiệm dày dặn trong lĩnh vực kiến trúc và xây dựng.",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
    date: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DHStudio",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.jpg`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+84-983-239-596",
        contactType: "customer service",
        areaServed: "VN",
        availableLanguage: ["Vietnamese"],
      },
    ],
  };

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
