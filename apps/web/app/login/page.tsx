'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-accent-coral text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-bg-card rounded-2xl p-8 max-w-md w-full border border-white/5">
        <h1 className="font-heading text-3xl font-bold text-center mb-2">FitForge</h1>
        <p className="text-text-secondary text-center mb-8">32-Day Body Transformation Tracker</p>

        <div className="space-y-4 text-center">
          <p className="text-text-muted text-sm">Sign in to sync your progress across all devices</p>
          <button
            onClick={signIn}
            className="w-full bg-accent-coral hover:bg-accent-coral/90 text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Sign in with Google
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-text-muted">
          <p>Your data syncs across phone, Mac, and Ubuntu</p>
        </div>
      </div>
    </div>
  );
}
