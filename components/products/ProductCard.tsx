'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Eye, Tag } from 'lucide-react';
import type { WPProduct } from '@/types/wordpress';
import { CONTACT_DATA } from '@/app/config';
import { buildWhatsAppQuoteUrl } from '@/lib/wordpress';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
    product: WPProduct;
    lang: string;
    dictionary: {
        viewDetail: string;
        quote: string;
        featured: string;
        noImage: string;
    };
}

export function ProductCard({ product, lang, dictionary }: ProductCardProps) {
    const mainImage = product.images?.[0];
    const category = product.categories?.[0];
    const quoteUrl = buildWhatsAppQuoteUrl(CONTACT_DATA.whatsapp.number, product.title);

    return (
        <article className="card group flex flex-col overflow-hidden h-full">
            {/* Image */}
            <div className="relative overflow-hidden bg-[var(--color-surface-alt)] aspect-[4/3]">
                {mainImage ? (
                    <Image
                        src={mainImage.src}
                        alt={mainImage.alt || product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--color-text-muted)]">
                        {/* Placeholder SVG */}
                        <svg viewBox="0 0 64 64" className="w-12 h-12 opacity-30" fill="currentColor">
                            <path d="M8 8h48v48H8z" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="22" cy="24" r="6" fillOpacity="0.4" />
                            <path d="M8 44l14-12 10 8 8-10 14 14" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        </svg>
                        <span className="text-xs font-medium">{dictionary.noImage}</span>
                    </div>
                )}

                {/* Featured badge */}
                {product.featured && (
                    <div className="absolute top-3 left-3">
                        <Badge variant="accent">{dictionary.featured}</Badge>
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/10 transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                {/* Category */}
                {category && (
                    <div className="flex items-center gap-1.5">
                        <Tag size={11} className="text-[var(--color-accent)]" />
                        <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                            {category}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h3 className="font-bold text-[var(--color-text)] text-base leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-200 line-clamp-2">
                    {product.title}
                </h3>

                {/* Short description */}
                {product.short_description && (
                    <p
                        className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 flex-1"
                        dangerouslySetInnerHTML={{ __html: product.short_description }}
                    />
                )}

                {/* SKU */}
                {product.sku && (
                    <p className="text-xs text-[var(--color-text-muted)] font-mono">
                        SKU: {product.sku}
                    </p>
                )}

                {/* Attributes preview */}
                {product.attributes && product.attributes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {product.attributes.slice(0, 2).map((attr) => (
                            <span
                                key={attr.id}
                                className="text-xs px-2 py-0.5 bg-[var(--color-surface-alt)] rounded-md text-[var(--color-secondary)] font-medium"
                            >
                                {attr.name}: {attr.options.slice(0, 1).join(', ')}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex gap-2 border-t border-[var(--color-border)] pt-4 mt-auto">
                <Link
                    href={`/${lang}/productos/${product.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    <Eye size={15} />
                    {dictionary.viewDetail}
                </Link>
            </div>
        </article>
    );
}
