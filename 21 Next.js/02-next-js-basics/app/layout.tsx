import './globals.css';

import type { Metadata } from 'next';

// This is the root layout. Next.js will apply it to the root page and all child pages.

export const metadata: Metadata = {
  title: 'NextJS App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
