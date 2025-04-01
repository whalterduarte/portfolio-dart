import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '../components/layout/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My Professional Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-gray-50">
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
