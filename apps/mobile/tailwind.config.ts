import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-card': '#1a1a2e',
        'bg-elevated': '#252540',
        'accent-coral': '#ff6b6b',
        'accent-teal': '#4ecdc4',
        'accent-gold': '#ffd93d',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0b0',
        'text-muted': '#6b6b7b',
        'success': '#6bcf7f',
        'danger': '#ff4757',
      },
    },
  },
  plugins: [],
};

export default config;
