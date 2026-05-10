'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '◉' },
  { href: '/gym', label: 'Gym', icon: '◎' },
  { href: '/meals', label: 'Meals', icon: '◈' },
  { href: '/swim', label: 'Swim', icon: '◇' },
  { href: '/hiit', label: 'HIIT', icon: '◆' },
  { href: '/progress', label: 'Progress', icon: '◐' },
  { href: '/schedule', label: 'Schedule', icon: '◑' },
  { href: '/health', label: 'Health', icon: '◒' },
  { href: '/recipes', label: 'Recipes', icon: '◓' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-card border-t border-white/5 md:hidden">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center px-2 py-1 text-xs ${
                pathname === item.href ? 'text-accent-coral' : 'text-text-muted'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-56 md:fixed md:inset-y-0 bg-bg-card border-r border-white/5">
        <div className="p-4">
          <h1 className="font-heading text-xl font-bold text-accent-coral">FitForge</h1>
          <p className="text-xs text-text-muted mt-1">32-Day Transformation</p>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-accent-coral/10 text-accent-coral'
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
