import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    Award, Shield, Target, Users, CheckCircle, ArrowRight,
    Calendar, Globe, MessageCircle,
} from 'lucide-react';
import { ENTITY_DATA, CONTACT_DATA, SEO_DEFAULTS } from '@/app/config';
import { OfficesSection } from '@/components/sections/OfficesSection';

export const metadata: Metadata = {
    title: 'Nosotros',
    description: `Conoce a Orthomaster: ${ENTITY_DATA.tagline}. Más de ${new Date().getFullYear() - ENTITY_DATA.founded} años de experiencia en equipamiento médico para trauma, ortopedia y rehabilitación en México.`,
    openGraph: {
        title: `Nosotros | ${SEO_DEFAULTS.siteName}`,
        url: `${SEO_DEFAULTS.baseUrl}/nosotros`,
    },
};

export default function NosotrosPage() {
    const yearsOfExperience = new Date().getFullYear() - ENTITY_DATA.founded;

    return (
        <div className="bg-[var(--color-bg)]">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden bg-[var(--color-primary-dark)]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/img/orthomaster-8.jpeg"
                        alt="Nosotros - Orthomaster"
                        fill
                        className="object-cover object-center opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary-dark)]/80 to-transparent" />
                </div>

                <div className="container-site relative z-10 text-white">
                    <nav className="flex items-center gap-2 text-sm text-blue-100/70 mb-8" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                        <span>/</span>
                        <span className="text-white font-medium">Nosotros</span>
                    </nav>

                    <div className="max-w-3xl">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 block">
                            Nuestra Trayectoria
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                            Más de {yearsOfExperience} años impulsando la medicina de precisión
                        </h1>
                        <p className="text-blue-50 text-xl leading-relaxed max-w-2xl">
                            {ENTITY_DATA.bio}
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-b border-[var(--color-border)]">
                <div className="container-site py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {ENTITY_DATA.stats.map((stat) => (
                            <div key={stat.label} className="text-center p-4">
                                <p className="font-black text-4xl text-[var(--color-primary)] leading-none mb-2">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-[var(--color-text-muted)] font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding">
                <div className="container-site">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mission */}
                        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white mb-5 shadow-md">
                                <Target size={22} />
                            </div>
                            <h2 className="font-bold text-xl text-[var(--color-text)] mb-3">Misión</h2>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">{ENTITY_DATA.mission}</p>
                        </div>
                        {/* Vision */}
                        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary-light)] flex items-center justify-center text-white mb-5 shadow-md">
                                <Globe size={22} />
                            </div>
                            <h2 className="font-bold text-xl text-[var(--color-text)] mb-3">Visión</h2>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">{ENTITY_DATA.vision}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-white">
                <div className="container-site">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
                            Nuestros Principios
                        </span>
                        <h2 className="section-title mb-4">Valores que nos guían</h2>
                        <p className="section-subtitle mx-auto">
                            Cada decisión en Orthomaster está respaldada por principios sólidos que garantizan la mejor experiencia para nuestros clientes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {ENTITY_DATA.values.map((value, idx) => (
                            <div
                                key={value.title}
                                className="group flex flex-col gap-4 p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md">
                                    <Award size={22} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--color-text)] text-base mb-2">{value.title}</h3>
                                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Offices & Coverage */}
            <OfficesSection />

            {/* Certifications */}
            <section className="section-padding bg-[var(--color-bg)]">
                <div className="container-site">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
                            Respaldo Internacional
                        </span>
                        <h2 className="section-title mb-4">Certificaciones y Avales</h2>
                        <p className="section-subtitle mx-auto">
                            Nuestros productos y procesos cumplen los más estrictos estándares internacionales de calidad.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {ENTITY_DATA.certifications.map((cert) => (
                            <div
                                key={cert.name}
                                className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-lg">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <p className="font-black text-xl text-[var(--color-primary)]">{cert.name}</p>
                                    <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-snug">{cert.issuer}</p>
                                    {cert.year && (
                                        <p className="text-xs font-semibold text-[var(--color-accent)] mt-1 flex items-center justify-center gap-1">
                                            <Calendar size={11} />
                                            Desde {cert.year}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white">
                <div className="container-site text-center">
                    <h2 className="text-3xl font-black mb-4">
                        ¿Quieres saber más o ver nuestro catálogo?
                    </h2>
                    <p className="text-blue-100 text-base mb-8 max-w-lg mx-auto">
                        Nuestro equipo está disponible para asesorarte y ofrecerte la mejor solución para tu institución.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/productos"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[var(--color-primary)] font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-md hover:-translate-y-0.5"
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
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1DA851] transition-all duration-300 shadow-md hover:-translate-y-0.5"
                        >
                            <MessageCircle size={18} />
                            Contactar por WhatsApp
                        </a> 
                        */}
                    </div>
                </div>
            </section>
        </div>
    );
}
