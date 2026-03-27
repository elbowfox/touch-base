"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: "🌿" },
  { href: "/feed", label: "Feed", icon: "🌊" },
  { href: "/compose", label: "Vent", icon: "✦" },
  { href: "/profile", label: "Profile", icon: "🤝" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-10 flex justify-around border-t border-stone-200 bg-white/90 py-3 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-950/90"
    >
      {links.map(({ href, label, icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
              active
                ? "text-stone-900 dark:text-stone-100"
                : "text-stone-400 hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-400"
            }`}
          >
            <span className="text-xl" aria-hidden="true">
              {icon}
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
