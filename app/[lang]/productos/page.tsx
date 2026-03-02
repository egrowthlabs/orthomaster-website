import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/wordpress';
import { SEO_DEFAULTS } from '@/app/config';
import { ProductsClient } from './ProductsClient';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';

interface ProductosPageProps {
    params: { lang: string };
}

export async function generateMetadata({ params }: ProductosPageProps): Promise<Metadata> {
    const { lang } = await params;
    const l = lang as Locale;
    const dict = await getDictionary(l);

    return {
        title: dict.products.title,
        description: dict.products.subtitle,
        openGraph: {
            title: `${dict.products.title} | ${SEO_DEFAULTS.siteName}`,
            description: dict.products.subtitle,
            url: `${SEO_DEFAULTS.baseUrl}/${l}/productos`,
        },
    };
}

export default async function ProductosPage({ params }: ProductosPageProps) {
    const { lang } = await params;
    const l = lang as Locale;
    const dict = await getDictionary(l);

    const [products, categories] = await Promise.all([
        getProducts(undefined, l),
        getCategories(l),
    ]);

    return (
        <>
            {/* Page Header */}
            <div className="relative bg-[var(--color-primary-dark)] text-white py-20 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/img/orthomaster-6.jpeg"
                        alt={dict.products.title}
                        fill
                        className="object-cover object-center opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary-dark)]/80 to-transparent" />
                </div>

                <div className="container-site relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-blue-100/70 mb-8" aria-label="Breadcrumb">
                        <Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.common.home}</Link>
                        <span>/</span>
                        <span className="text-white font-medium">{dict.navbar.products}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-lg backdrop-blur-sm">
                            <Package size={32} className="text-[var(--color-accent)]" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                                {dict.products.title}
                            </h1>
                            <p className="text-blue-50 text-lg max-w-2xl leading-relaxed">
                                {dict.products.subtitle}
                                {products.length > 0 && (
                                    <span className="ml-2 font-semibold text-[var(--color-accent)]">
                                        {dict.products.available.replace('{count}', products.length.toString())}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Client-side filter + grid */}
            <ProductsClient
                products={products}
                categories={categories}
                lang={lang}
                dictionary={dict.products}
            />
        </>
    );
}
