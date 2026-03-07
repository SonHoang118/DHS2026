import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Công Ty Thiết Kế & Thi Công Kiến Trúc Chuyên Nghiệp",
  description: "Giải pháp kiến trúc toàn diện từ thiết kế đến thi công. Hơn 10 năm kinh nghiệm trong lĩnh vực kiến trúc và xây dựng.",
  keywords: "kiến trúc, thi công, thiết kế, xây dựng, tư vấn",
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
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
