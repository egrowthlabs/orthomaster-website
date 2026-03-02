import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/wordpress';
import { SEO_DEFAULTS } from '@/app/config';
import { ProductsClient } from './ProductsClient';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Catálogo de Productos',
    description: `Explora el catálogo completo de equipamiento médico de Orthomaster: trauma, ortopedia, instrumentación y rehabilitación. Productos certificados para profesionales de la salud.`,
    openGraph: {
        title: `Catálogo de Productos | ${SEO_DEFAULTS.siteName}`,
        description: 'Equipamiento médico especializado: trauma, ortopedia, instrumentación y rehabilitación.',
        url: `${SEO_DEFAULTS.baseUrl}/productos`,
    },
};

export default async function ProductosPage() {
    const [products, categories] = await Promise.all([
        getProducts(),
        getCategories(),
    ]);

    return (
        <>
            {/* Page Header */}
            <div className="relative bg-[var(--color-primary-dark)] text-white py-20 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/img/orthomaster-6.jpeg"
                        alt="Catálogo Orthomaster"
                        fill
                        className="object-cover object-center opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary-dark)]/80 to-transparent" />
                </div>

                <div className="container-site relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-blue-100/70 mb-8" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <span>/</span>
                        <span className="text-white font-medium">Productos</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-lg backdrop-blur-sm">
                            <Package size={32} className="text-[var(--color-accent)]" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                                Catálogo de Productos
                            </h1>
                            <p className="text-blue-50 text-lg max-w-2xl leading-relaxed">
                                Equipamiento médico certificado para trauma, ortopedia e instrumentación quirúrgica.
                                {products.length > 0 && (
                                    <span className="ml-2 font-semibold text-[var(--color-accent)]">
                                        {products.length} productos disponibles.
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Client-side filter + grid */}
            <ProductsClient products={products} categories={categories} />
        </>
    );
}
