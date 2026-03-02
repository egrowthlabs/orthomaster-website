import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Shield, Award, Zap, ChevronRight,
  Phone
} from 'lucide-react';
import { ENTITY_DATA, PRODUCT_CATEGORIES_FALLBACK, SEO_DEFAULTS, DISPLAY_CATEGORIES } from '@/app/config';
import { getProducts, getCategories } from '@/lib/wordpress';
import { ProductCard } from '@/components/products/ProductCard';
import { HeroCarousel } from '@/components/shared/HeroCarousel';
import { OfficesSection } from '@/components/sections/OfficesSection';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';

export const metadata: Metadata = {
  title: SEO_DEFAULTS.defaultTitle,
  description: SEO_DEFAULTS.defaultDescription,
};

export const revalidate = 3600;

const iconMap: Record<string, React.ReactNode> = {
  'shield-check': <Shield className="w-7 h-7" />,
  target: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 21l7.65-7.99.77-.78a5.4 5.4 0 0 0 0-7.65z" />
    </svg>
  ),
  zap: <Zap className="w-7 h-7" />,
};

interface HomePageProps {
  params: { lang: string };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const l = lang as Locale;
  const dict = await getDictionary(l);

  // Fetch featured products (first 4) with language param
  const allProducts = await getProducts(undefined, l);
  const featuredProducts = allProducts.filter((p) => p.featured).slice(0, 4);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4);

  // Fetch and filter Categories based on config
  const wpCategories = await getCategories(lang);
  const categoryCards = DISPLAY_CATEGORIES.map(name => {
    const wpCat = wpCategories.find(c => c.name === name);
    const fbCat = PRODUCT_CATEGORIES_FALLBACK.find(c => c.name === name);
    return {
      slug: wpCat?.slug || fbCat?.slug || '',
      name: name,
      description: wpCat?.description || fbCat?.description || '',
      image: wpCat?.image || fbCat?.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(name)}`,
      color: fbCat?.color || 'var(--color-primary)'
    }
  }).filter(c => c.slug);

  return (
    <>
      {/* ============================================================
          HERO SECTION
      ============================================================ */}
      <HeroCarousel lang={lang} dictionary={dict.home.hero} />

      {/* ============================================================
          STATS STRIP
      ============================================================ */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="container-site py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ENTITY_DATA.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-black text-3xl lg:text-4xl text-[var(--color-primary)] leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] font-medium leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PRODUCT CATEGORIES
      ============================================================ */}
      <section className="section-padding bg-[var(--color-bg)]">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
              {dict.products.categories}
            </span>
            <h2 className="section-title mb-4">
              {dict.products.title}
            </h2>
            <p className="section-subtitle mx-auto">
              {dict.products.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryCards.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${lang}/productos?categoria=${cat.slug}`}
                className="group relative flex flex-col p-0 bg-white rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Accent stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 z-10 transition-all duration-300"
                  style={{ background: cat.color }}
                />

                {/* Image Header */}
                <div className="relative w-full aspect-[4/3] bg-gray-100 border-b border-[var(--color-border)]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div>
                    <h3 className="font-bold text-[var(--color-text)] text-lg mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    )}
                  </div>

                  <div
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider mt-auto"
                    style={{ color: cat.color.includes('var') ? undefined : cat.color }}
                  >
                    {dict.products.viewProducts}
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED PRODUCTS
      ============================================================ */}
      {displayProducts.length > 0 && (
        <section className="section-padding bg-[var(--color-surface-alt)]">
          <div className="container-site">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2 block">
                  {dict.home.featured.badge}
                </span>
                <h2 className="section-title">
                  {dict.home.featured.title}
                </h2>
              </div>
              <Link
                href={`/${lang}/productos`}
                className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm hover:underline shrink-0"
              >
                {dict.home.featured.viewAll}
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  dictionary={dict.products}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          VALUES / BY SECTION
      ============================================================ */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left text */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
                {dict.home.whyUs.badge}
              </span>
              <h2 className="section-title mb-5">
                {dict.home.whyUs.title}
              </h2>
              <p className="text-[var(--color-text-muted)] text-base leading-relaxed mb-8">
                {ENTITY_DATA.bio}
              </p>
              <Link
                href={`/${lang}/nosotros`}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              >
                {dict.home.whyUs.learnMore}
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ENTITY_DATA.values.map((value) => (
                <div
                  key={value.title}
                  className="flex flex-col gap-3 p-5 bg-[var(--color-bg)] rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md">
                    {iconMap[value.icon] ?? <Award className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text)] mb-1">{value.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA BANNER
      ============================================================ */}
      <section className="section-padding bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 h-full w-96 opacity-10">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="160" cy="40" r="100" stroke="white" strokeWidth="1" />
            <circle cx="160" cy="40" r="70" stroke="white" strokeWidth="1" />
            <circle cx="160" cy="40" r="40" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 block">
              {dict.common.contact}
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-5 leading-tight">
              {dict.home.cta.title}
            </h2>
            <p className="text-blue-200 text-base mb-8 leading-relaxed">
              {dict.home.cta.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${lang}/contacto`}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                <Phone size={18} />
                {dict.home.cta.button}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offices & Coverage */}
      <OfficesSection dictionary={dict.offices} />
    </>
  );
}
