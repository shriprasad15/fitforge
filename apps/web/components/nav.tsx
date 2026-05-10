'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

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
  { href: '/shopping', label: 'Shopping', icon: '◔' },
];

export function Nav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

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
        {user && (
          <div className="p-3 border-t border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-accent-coral/20 flex items-center justify-center text-xs text-accent-coral font-bold">
                {user.displayName?.[0] || user.email?.[0] || '?'}
              </div>
              <span className="text-xs text-text-secondary truncate">{user.displayName || user.email}</span>
            </div>
            <button
              onClick={signOut}
              className="w-full text-xs py-1.5 px-3 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
