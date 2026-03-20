import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SoulCraft AI — Immaculate Digital Conception',
  description:
    'Craft the complete identity architecture for your AI agent. Generate Soul.md, User.md, Memory.md, Tools.md, and Heartbeat.md — the 5 sacred files that bring an agent to life.',
  openGraph: {
    title: 'SoulCraft AI',
    description: 'Give birth to an AI soul. Immaculate Digital Conception.',
    images: [{ url: '/og-soulcraft.png', width: 1200, height: 630 }],
  },
};

export default function SoulCraftLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="soulcraft-root" style={{ background: '#060610', minHeight: '100vh', color: '#e2e8f0' }}>
      {children}
    </div>
  );
}
