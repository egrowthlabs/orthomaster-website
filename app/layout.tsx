import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat';
import { SEO_DEFAULTS, BRANDING } from '@/app/config';

export const metadata: Metadata = {
  title: {
    default: SEO_DEFAULTS.defaultTitle,
    template: `%s | ${SEO_DEFAULTS.siteName}`,
  },
  description: SEO_DEFAULTS.defaultDescription,
  keywords: SEO_DEFAULTS.keywords,
  metadataBase: new URL(SEO_DEFAULTS.baseUrl),
  openGraph: {
    type: 'website',
    locale: SEO_DEFAULTS.locale,
    url: SEO_DEFAULTS.baseUrl,
    siteName: SEO_DEFAULTS.siteName,
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.defaultDescription,
    images: [
      {
        url: SEO_DEFAULTS.ogImage,
        width: 1200,
        height: 630,
        alt: SEO_DEFAULTS.defaultTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SEO_DEFAULTS.twitterHandle,
    title: SEO_DEFAULTS.defaultTitle,
    description: SEO_DEFAULTS.defaultDescription,
    images: [SEO_DEFAULTS.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content={BRANDING.colors.primary} />
      </head>
      <body className="flex flex-col min-h-screen" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }} suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        {/* <WhatsAppFloat /> */}
      </body>
    </html>
  );
}
