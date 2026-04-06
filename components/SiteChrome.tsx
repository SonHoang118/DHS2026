'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

type SiteChromeProps = {
  children: React.ReactNode;
};

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen bg-[#f5f6f2]">{children}</div>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <div className="pt-20 md:pt-24">{children}</div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
