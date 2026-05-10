import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Nav } from '@/components/nav';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitForge — 32-Day Transformation',
  description: 'Personal fitness tracker for IITM body transformation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-text-primary min-h-screen">
        <Providers>
          <Nav />
          <main className="md:ml-56 pb-20 md:pb-0 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
