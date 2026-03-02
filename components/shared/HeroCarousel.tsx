'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';

const images = [

    '/assets/img/orthomaster-2.jpeg',
    '/assets/img/banner-orthomaster-1.jpeg',
    '/assets/img/orthomaster-1.jpeg',
    '/assets/img/hero-orthomaster-bg1.jpeg',
];

interface HeroCarouselProps {
    lang: string;
    dictionary: {
        badge: string;
        title: string;
        subtitle: string;
        viewCatalog: string;
        trustChips: string[];
        stats: {
            value: string;
            label: string;
        };
    };
}

export function HeroCarousel({ lang, dictionary }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--color-primary-dark)]">
            {/* Carousel Images with Overlay */}
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Hero Orthomaster ${index + 1}`}
                        fill
                        className="object-cover object-center"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-[#052d4a]/40 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#052d4a] via-[#094068]/90 to-transparent" />
                </div>
            ))}

            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#81c754]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-[#094068]/20 blur-3xl pointer-events-none" />

            <div className="container-site relative z-10 py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                        {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-semibold text-blue-100 mb-6 backdrop-blur-sm">
                            <Shield size={14} className="text-[#81c754]" />
                            {dictionary.badge}
                        </div> */}

                        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight"
                            dangerouslySetInnerHTML={{ __html: dictionary.title }}
                        />

                        <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                            {dictionary.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            <Link
                                href={`/${lang}/productos`}
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[var(--color-primary)] font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
                            >
                                {dictionary.viewCatalog}
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {dictionary.trustChips.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-1.5 text-sm text-blue-100"
                                >
                                    <CheckCircle size={14} className="text-[#81c754] shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block relative h-full w-full">
                        <div className="absolute right-0 bottom-0 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20">
                            <p className="font-black text-4xl text-white">{dictionary.stats.value}</p>
                            <p
                                className="text-base text-blue-100 font-medium"
                                dangerouslySetInnerHTML={{ __html: dictionary.stats.label }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-8 bg-[#81c754]' : 'w-4 bg-white/40 hover:bg-white/60'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
