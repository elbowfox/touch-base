import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TouchBase - Your Personal Virtual Zen Garden',
  description: 'A beautiful marriage of form and function. A community support platform on the BASE chain.',
  keywords: ['mental health', 'community', 'support', 'zen', 'mindfulness', 'BASE', 'Farcaster'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
