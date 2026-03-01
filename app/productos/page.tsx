import type { Metadata } from 'next';
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
            <div className="bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white py-14">
                <div className="container-site">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-blue-200/70 mb-5" aria-label="Breadcrumb">
                        <a href="/" className="hover:text-white transition-colors">Inicio</a>
                        <span>/</span>
                        <span className="text-white font-medium">Productos</span>
                    </nav>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-1">
                            <Package size={24} className="text-[var(--color-accent)]" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">
                                Catálogo de Productos
                            </h1>
                            <p className="text-blue-100 text-base max-w-xl leading-relaxed">
                                Equipamiento médico certificado para trauma, ortopedia e instrumentación quirúrgica.
                                {products.length > 0 && (
                                    <span className="ml-1 font-semibold text-[var(--color-accent)]">
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
