'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, ArrowRight, MessageCircle, CheckCircle } from 'lucide-react';
import { CONTACT_DATA } from '@/app/config';

const images = [
    '/assets/img/hero-orthomaster.jpeg',
    '/assets/img/banner-orthomaster-1.jpeg',
    '/assets/img/orthomaster-1.jpeg',
];

export function HeroCarousel() {
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
                    {/* Dark Overlay mapped over using absolute positioning and multiply blend mode for rich colors */}
                    <div className="absolute inset-0 bg-[#052d4a]/40 mix-blend-multiply" />
                    {/* Gradient to make text readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#052d4a] via-[#094068]/90 to-transparent" />
                </div>
            ))}

            {/* Glow orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#81c754]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-[#094068]/20 blur-3xl pointer-events-none" />

            <div className="container-site relative z-10 py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Column */}
                    <div className="text-white">
                        {/* Pill badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-semibold text-blue-100 mb-6 backdrop-blur-sm">
                            <Shield size={14} className="text-[#81c754]" />
                            Distribuidora Certificada COFEPRIS · ISO 13485
                        </div>

                        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 tracking-tight">
                            Especialistas en{' '}
                            <span className="text-[#81c754]">Trauma</span>{' '}
                            y{' '}
                            <span className="relative inline-block">
                                Ortopedia
                                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#81c754] to-transparent rounded-full" />
                            </span>
                        </h1>

                        <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                            Equipamiento médico de precisión para hospitales y cirujanos.
                            Más de 15 años proveyendo soluciones de calidad certificada a instituciones de salud en México.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            <Link
                                href="/productos"
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[var(--color-primary)] font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
                            >
                                Ver Catálogo
                                <ArrowRight size={18} />
                            </Link>
                            {/* WhatsApp button commented out per user request */}
                            {/* 
                            <a
                                href={`https://wa.me/${CONTACT_DATA.whatsapp.urgencias}?text=${encodeURIComponent(CONTACT_DATA.whatsapp.defaultMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1DA851] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-base"
                            >
                                <MessageCircle size={18} />
                                Cotizar Ahora
                            </a> 
                            */}
                        </div>

                        {/* Trust chips */}
                        <div className="flex flex-wrap gap-3">
                            {['Entrega Nacional', 'Soporte Técnico 24/7', '+500 Productos'].map((item) => (
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

                    {/* Empty space for balance, or stats card */}
                    <div className="hidden lg:block relative h-full w-full">
                        {/* Floating stats card */}
                        <div className="absolute right-0 bottom-0 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20">
                            <p className="font-black text-4xl text-white">+1,500</p>
                            <p className="text-base text-blue-100 font-medium">Cirujanos confían<br />en Orthomaster</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel Indicators */}
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
