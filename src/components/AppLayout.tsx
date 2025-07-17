import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function AppLayout({
  children,
  pageTitle,
}: {
  children: ReactNode;
  pageTitle: string;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 sm:flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1 sm:pl-14">
        <Header pageTitle={pageTitle} />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:p-6">{children}</main>
      </div>
    </div>
  );
}
