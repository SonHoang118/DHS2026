import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
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
        <Header />
        <div className="pt-20 md:pt-24">{children}</div>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
