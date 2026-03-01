'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { WPProduct, WPCategory } from '@/types/wordpress';
import { ProductGrid } from '@/components/products/ProductGrid';
import { PRODUCT_CATEGORIES_FALLBACK, DISPLAY_CATEGORIES } from '@/app/config';
import { Input } from '@/components/ui/Input';

interface ProductsClientProps {
    products: WPProduct[];
    categories: WPCategory[];
}

export function ProductsClient({ products, categories }: ProductsClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    // Read category from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('categoria');
        if (cat) setSelectedCategory(cat);
    }, []);

    // Merge API categories with fallback
    const baseCategories = categories.length > 0
        ? categories
        : PRODUCT_CATEGORIES_FALLBACK.map(c => ({ id: c.id, name: c.name, slug: c.slug }));

    // Only show categories defined in the config, and ensure exact casing
    const allowedCategoryNames = DISPLAY_CATEGORIES.map(c => c.toLowerCase().trim());
    const displayCategories = baseCategories
        .map(c => {
            const normalized = c.name.toLowerCase().trim();
            const index = allowedCategoryNames.indexOf(normalized);
            if (index !== -1) {
                return { ...c, name: DISPLAY_CATEGORIES[index] };
            }
            return null;
        })
        .filter((c): c is WPCategory => c !== null);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchesCategory =
                selectedCategory === 'all' ||
                p.categories?.includes(selectedCategory);

            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                !searchTerm ||
                p.title.toLowerCase().includes(searchLower) ||
                p.short_description?.toLowerCase().includes(searchLower) ||
                p.sku?.toLowerCase().includes(searchLower) ||
                p.categories?.some((c) => c.toLowerCase().includes(searchLower));

            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchTerm]);

    return (
        <>
            {/* Toolbar */}
            <div className="bg-white border-b border-[var(--color-border)] sticky top-20 z-10">
                <div className="container-site py-4">
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        {/* Search */}
                        <div className="relative flex-1 max-w-sm">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
                            />
                            <input
                                type="search"
                                placeholder="Buscar producto, SKU…"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-colors"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Results count */}
                        <p className="text-sm text-[var(--color-text-muted)] sm:ml-2">
                            <span className="font-semibold text-[var(--color-text)]">{filtered.length}</span> productos
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === 'all'
                                ? 'bg-[var(--color-primary)] text-white shadow-md'
                                : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] border border-[var(--color-border)]'
                                }`}
                        >
                            Todos
                        </button>
                        {displayCategories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === cat.name
                                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                                    : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] border border-[var(--color-border)]'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container-site py-10">
                <ProductGrid
                    products={filtered}
                    emptyMessage={
                        searchTerm
                            ? `No encontramos productos para "${searchTerm}". Intenta con otro término.`
                            : 'No hay productos en esta categoría. Revisa más tarde o contáctanos.'
                    }
                />
            </div>
        </>
    );
}
