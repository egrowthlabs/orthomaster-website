'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { WPProductImage } from '@/types/wordpress';

interface ImageGalleryProps {
    images: WPProductImage[];
    title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-[var(--color-surface-alt)] rounded-2xl flex flex-col items-center justify-center gap-3 text-[var(--color-text-muted)]">
                <svg viewBox="0 0 64 64" className="w-14 h-14 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="8" y="8" width="48" height="48" rx="4" />
                    <circle cx="22" cy="24" r="5" />
                    <path d="M8 44l14-12 10 8 8-10 14 14" />
                </svg>
                <span className="text-sm font-medium">Sin imágenes disponibles</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--color-surface-alt)] group">
                <Image
                    src={images[activeIndex].src}
                    alt={images[activeIndex].alt || title}
                    fill
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
                {/* Zoom hint */}
                <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:text-[var(--color-primary)] shadow-sm"
                    aria-label="Ampliar imagen"
                >
                    <ZoomIn size={16} />
                </button>
                {/* Navigation arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--color-text)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white shadow-sm"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--color-text)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white shadow-sm"
                            aria-label="Imagen siguiente"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                        <button
                            key={img.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${idx === activeIndex
                                    ? 'border-[var(--color-primary)] shadow-md'
                                    : 'border-[var(--color-border)] opacity-70 hover:opacity-100'
                                }`}
                            aria-label={`Ver imagen ${idx + 1}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt || `${title} - imagen ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <div className="relative max-w-3xl max-h-[90vh] w-full aspect-square">
                        <Image
                            src={images[activeIndex].src}
                            alt={images[activeIndex].alt || title}
                            fill
                            className="object-contain"
                            sizes="90vw"
                        />
                    </div>
                    <button
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}
