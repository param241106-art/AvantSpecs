/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#fafaf8',
        surface: '#ffffff',
        ink: {
          DEFAULT: '#1a1a18',
          secondary: '#4a4a44',
          muted: '#8a8a82',
        },
        green: {
          DEFAULT: '#1c3d2d',
          mid: '#2a5540',
          light: '#3d7a58',
          tint: '#e8f2eb',
        },
        gold: {
          DEFAULT: '#c9943e',
          light: '#e0b055',
          tint: '#fdf5e4',
        },
        rust: '#8c4326',
        line: {
          DEFAULT: '#e0dbd2',
          strong: '#c8c0b4',
        },
      },
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        numeric: ['Quicksand', 'sans-serif'],
        label: ['Jost', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1200px',
        'wrap-tight': '900px',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        soft: '0 4px 16px rgba(0,0,0,0.1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'flash-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'flash-in': 'flash-in 0.25s ease-out forwards',
      },
    },
  },
  plugins: [],
};
