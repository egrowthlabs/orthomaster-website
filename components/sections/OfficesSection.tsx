'use client';

import Image from 'next/image';
import { MapPin, Globe, CheckCircle2, Building2 } from 'lucide-react';
import { ENTITY_DATA, BRANDING } from '@/app/config';

interface OfficesSectionProps {
    dictionary: {
        badge: string;
        title: string;
        description: string;
        impact: string;
        coverage: string;
        listTitle: string;
        listSubtitle: string;
        trustTitle: string;
        trustDescription: string;
    };
}

export function OfficesSection({ dictionary }: OfficesSectionProps) {
    const { offices } = ENTITY_DATA;

    return (
        <section id="oficinas" className="section-padding bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-primary-light)]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl"></div>

            <div className="container-site relative z-10">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-4">
                        <Globe size={14} className="animate-pulse" />
                        {dictionary.badge}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[var(--color-primary-dark)] mb-6 tracking-tight">
                        {dictionary.title}
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full mb-6"></div>
                    <p className="max-w-2xl text-[var(--color-text-muted)] text-lg leading-relaxed mx-auto">
                        {dictionary.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
                    {/* Mapa Interactivo / Visual */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="relative group">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                            <div className="relative bg-white rounded-[2rem] border border-[var(--color-border)] shadow-2xl overflow-hidden p-3 sm:p-5">
                                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-50 border border-[var(--color-border)]/50">
                                    <Image
                                        src={offices.mapImage}
                                        alt="Mapa de Cobertura Orthomaster"
                                        fill
                                        className="object-contain p-4 hover:scale-105 transition-transform duration-1000 ease-out"
                                        priority
                                    />

                                    {/* Glassmorphism Population Badge */}
                                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto sm:w-[340px]">
                                        <div className="backdrop-blur-md bg-white/70 border border-white/40 p-5 rounded-2xl shadow-xl flex items-center gap-5 translate-y-0 hover:-translate-y-2 transition-transform duration-500">
                                            <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-[var(--color-primary)]/30 shrink-0">
                                                {offices.coverage.percentage}%
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-[var(--color-primary)] mb-1">{dictionary.impact}</p>
                                                <p className="text-xs leading-tight text-[var(--color-primary-dark)] font-bold italic">
                                                    "{dictionary.coverage}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cities Grid Section */}
                    <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-lg">
                                <Building2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[var(--color-primary-dark)]">{dictionary.listTitle}</h3>
                                <p className="text-sm font-medium text-[var(--color-text-muted)]">{dictionary.listSubtitle}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                            {offices.cities.map((city, idx) => (
                                <div
                                    key={city}
                                    className="flex items-center gap-3 py-1 group transition-all duration-300"
                                    style={{ transitionDelay: `${idx * 50}ms` }}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] group-hover:scale-150 transition-transform duration-300 shadow-[0_0_8px_var(--color-accent)]"></div>
                                    <span className="font-bold text-base text-[var(--color-primary-dark)] tracking-wide group-hover:text-[var(--color-accent)] transition-colors duration-300 uppercase">
                                        {city}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Network Trust Indicator */}
                        <div className="mt-10 p-6 rounded-3xl bg-slate-50 border border-slate-200/50 flex items-start gap-4">
                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-200">
                                <CheckCircle2 className="text-[var(--color-success)]" size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-[var(--color-primary-dark)] text-sm mb-1 uppercase tracking-tight">{dictionary.trustTitle}</h4>
                                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                                    {dictionary.trustDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
