import React from 'react';
import { PackageOpen } from 'lucide-react';
import type { WPProduct } from '@/types/wordpress';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';

interface ProductGridProps {
    products: WPProduct[];
    lang: string;
    dictionary: {
        viewDetail: string;
        quote: string;
        featured: string;
        noImage: string;
    };
    loading?: boolean;
    skeletonCount?: number;
    emptyMessage?: string;
}

export function ProductGrid({
    products,
    lang,
    dictionary,
    loading = false,
    skeletonCount = 8,
    emptyMessage = 'No se encontraron productos en esta categoría.',
}: ProductGridProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-alt)] flex items-center justify-center">
                    <PackageOpen size={28} className="text-[var(--color-text-muted)]" />
                </div>
                <div>
                    <p className="font-semibold text-[var(--color-text)] text-lg">Sin resultados</p>
                    <p className="text-[var(--color-text-muted)] text-sm mt-1 max-w-xs">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    lang={lang}
                    dictionary={dictionary}
                />
            ))}
        </div>
    );
}
