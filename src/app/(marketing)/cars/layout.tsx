import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Cars',
};

export default function CarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto w-full max-w-none">{children}</div>
      <SiteFooter />
    </>
  );
}
