import type { Metadata } from 'next';
import '../globals.css';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { WhatsAppFloat } from '@/components/shared/WhatsAppFloat';
import { SEO_DEFAULTS, BRANDING } from '@/app/config';
import { i18n, type Locale } from '@/i18n.config';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

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

import { getDictionary } from '@/lib/dictionary';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: l } = await params;
  const dict = await getDictionary(l as Locale);

  return (
    <html lang={l} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content={BRANDING.colors.primary} />
      </head>
      <body className="flex flex-col min-h-screen" style={{ fontFamily: 'Outfit, system-ui, sans-serif' }} suppressHydrationWarning>
        <Navbar lang={l} dictionary={dict.navbar} />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer lang={l} dictionary={dict.footer} />
        {/* <WhatsAppFloat dictionary={dict.whatsapp} /> */}
      </body>
    </html>
  );
}
