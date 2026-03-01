import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1A5276',
                    dark: '#0F3460',
                    light: '#2980B9',
                },
                secondary: {
                    DEFAULT: '#4A5568',
                },
                accent: {
                    DEFAULT: '#00A3E0',
                },
                whatsapp: {
                    DEFAULT: '#25D366',
                    dark: '#1DA851',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    alt: '#EEF2F7',
                },
                brand: {
                    bg: '#F8FAFC',
                    border: '#E2E8F0',
                    text: '#1A202C',
                    muted: '#718096',
                },
            },
            fontFamily: {
                sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                glow: '0 0 0 3px rgba(26, 82, 118, 0.25)',
                'accent-glow': '0 0 20px rgba(0, 163, 224, 0.3)',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(-8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-out',
                shimmer: 'shimmer 1.5s infinite',
            },
        },
    },
    plugins: [],
};

export default config;
