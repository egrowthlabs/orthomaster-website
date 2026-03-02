'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
    image?: string | null;
    title: string;
}

export function ImageGallery({ image, title }: ImageGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!image) {
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
                    src={image}
                    alt={title}
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
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <div className="relative max-w-3xl max-h-[90vh] w-full aspect-square">
                        <Image
                            src={image}
                            alt={title}
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
