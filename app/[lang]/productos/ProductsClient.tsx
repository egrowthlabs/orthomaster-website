'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import type { WPProduct, WPCategory } from '@/types/wordpress';
import { ProductGrid } from '@/components/products/ProductGrid';
import { PRODUCT_CATEGORIES_FALLBACK, DISPLAY_CATEGORIES } from '@/app/config';

interface ProductsClientProps {
    products: WPProduct[];
    categories: WPCategory[];
    lang: string;
    dictionary: {
        all: string;
        searchPlaceholder: string;
        resultsFound: string;
        emptySearch: string;
        emptyCategory: string;
        viewDetail: string;
        quote: string;
        featured: string;
        noImage: string;
    };
}

export function ProductsClient({ products, categories, lang, dictionary }: ProductsClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Read category from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('categoria');
        if (cat) setSelectedCategory(cat);
    }, []);

    const activeMainCategory = useMemo(() => {
        if (selectedCategory === 'all') return null;
        const main = DISPLAY_CATEGORIES.find(c => c.name === selectedCategory);
        if (main) return main;
        const parent = DISPLAY_CATEGORIES.find(c => c.subcategories?.some(s => s.name === selectedCategory));
        return parent || null;
    }, [selectedCategory]);

    const filtered = useMemo(() => {
        return products.filter((p) => {
            let matchesCategory = selectedCategory === 'all';

            if (!matchesCategory) {
                const mainCategory = DISPLAY_CATEGORIES.find(c => c.name === selectedCategory);
                if (mainCategory) {
                    const validNames = [mainCategory.name, ...(mainCategory.subcategories?.map(s => s.name) || [])];
                    matchesCategory = p.categories?.some(c => validNames.includes(c)) || false;
                } else {
                    matchesCategory = p.categories?.includes(selectedCategory) || false;
                }
            }

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
            <div className="bg-white border-b border-[var(--color-border)] sticky top-16 md:top-20 z-10">
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
                                placeholder={dictionary.searchPlaceholder}
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
                            <span className="font-semibold text-[var(--color-text)]">
                                {dictionary.resultsFound.replace('{count}', filtered.length.toString())}
                            </span>
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-col gap-2 mt-3">
                        {/* Main Categories Row */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === 'all'
                                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                                    : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] border border-[var(--color-border)]'
                                    }`}
                            >
                                {dictionary.all}
                            </button>
                            {DISPLAY_CATEGORIES.map((cat) => {
                                const isActive = activeMainCategory?.name === cat.name;
                                const displayName = lang === 'en' && 'enName' in cat && cat.enName ? cat.enName : cat.name;
                                return (
                                    <button
                                        key={cat.slug}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${isActive
                                            ? 'bg-[var(--color-primary)] text-white shadow-md'
                                            : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] border border-[var(--color-border)]'
                                            }`}
                                    >
                                        {displayName}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Subcategories Row - only if the active main category has subcategories */}
                        {activeMainCategory && activeMainCategory.subcategories && activeMainCategory.subcategories.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:ml-2">
                                <button
                                    onClick={() => setSelectedCategory(activeMainCategory.name)}
                                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${selectedCategory === activeMainCategory.name
                                        ? 'bg-[var(--color-secondary)] text-white shadow-md'
                                        : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] border border-[var(--color-border)]'
                                        }`}
                                >
                                    {lang === 'en' ? 'All in' : 'Todos en'} {lang === 'en' && 'enName' in activeMainCategory && activeMainCategory.enName ? activeMainCategory.enName : activeMainCategory.name}
                                </button>
                                {activeMainCategory.subcategories.map(sub => {
                                    const displaySubName = lang === 'en' && 'enName' in sub && sub.enName ? sub.enName : sub.name;
                                    return (
                                        <button
                                            key={sub.slug}
                                            onClick={() => setSelectedCategory(sub.name)}
                                            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${selectedCategory === sub.name
                                                ? 'bg-[var(--color-secondary)] text-white shadow-md'
                                                : 'bg-[var(--color-bg)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] border border-[var(--color-border)]'
                                                }`}
                                        >
                                            {displaySubName}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container-site py-10">
                <ProductGrid
                    products={filtered}
                    lang={lang}
                    dictionary={dictionary}
                    emptyMessage={
                        searchTerm
                            ? dictionary.emptySearch.replace('{term}', searchTerm)
                            : dictionary.emptyCategory
                    }
                />
            </div>
        </>
    );
}
