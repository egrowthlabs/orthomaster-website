import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    Award, Shield, Target, Globe, ArrowRight,
    Calendar,
} from 'lucide-react';
import { ENTITY_DATA, SEO_DEFAULTS } from '@/app/config';
import { OfficesSection } from '@/components/sections/OfficesSection';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';

interface NosotrosPageProps {
    params: { lang: string };
}

export async function generateMetadata({ params }: NosotrosPageProps): Promise<Metadata> {
    const { lang } = await params;
    const l = lang as Locale;
    const dict = await getDictionary(l);

    return {
        title: dict.navbar.about,
        description: `Orthomaster: ${ENTITY_DATA.tagline}.`,
        openGraph: {
            title: `${dict.navbar.about} | ${SEO_DEFAULTS.siteName}`,
            url: `${SEO_DEFAULTS.baseUrl}/${l}/nosotros`,
        },
    };
}

export default async function NosotrosPage({ params }: NosotrosPageProps) {
    const { lang } = await params;
    const l = lang as Locale;
    const dict = await getDictionary(l);
    const yearsOfExperience = 9;

    return (
        <div className="bg-[var(--color-bg)]">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden bg-[var(--color-primary-dark)]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/img/orthomaster-8.jpeg"
                        alt={`${dict.navbar.about} - Orthomaster`}
                        fill
                        className="object-cover object-center opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary-dark)]/80 to-transparent" />
                </div>

                <div className="container-site relative z-10 text-white">
                    <nav className="flex items-center gap-2 text-sm text-blue-100/70 mb-8" aria-label="Breadcrumb">
                        <Link href={`/${l}`} className="hover:text-white transition-colors">{dict.common.home}</Link>
                        <span>/</span>
                        <span className="text-white font-medium">{dict.navbar.about}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 block">
                            {dict.about.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                            {dict.about.experience.replace('{years}', yearsOfExperience.toString())}
                        </h1>
                        <p className="text-blue-50 text-xl leading-relaxed max-w-2xl">
                            {dict.home.whyUs.description}
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
                        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white mb-5 shadow-md">
                                <Target size={22} />
                            </div>
                            <h2 className="font-bold text-xl text-[var(--color-text)] mb-3">{dict.about.mission}</h2>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">{dict.about.missionText}</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary-light)] flex items-center justify-center text-white mb-5 shadow-md">
                                <Globe size={22} />
                            </div>
                            <h2 className="font-bold text-xl text-[var(--color-text)] mb-3">{dict.about.vision}</h2>
                            <p className="text-[var(--color-text-muted)] leading-relaxed">{dict.about.visionText}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-white">
                <div className="container-site">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
                            {dict.about.principles}
                        </span>
                        <h2 className="section-title mb-4">{dict.about.valuesTitle}</h2>
                        <p className="section-subtitle mx-auto">
                            {dict.about.valuesSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {ENTITY_DATA.values.map((value, index) => {
                            const translatedValue = dict.about.valuesList[index];
                            return (
                                <div
                                    key={value.title}
                                    className="group flex flex-col gap-4 p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white shadow-md">
                                        <Award size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[var(--color-text)] text-base mb-2">{translatedValue?.title || value.title}</h3>
                                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{translatedValue?.description || value.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Offices & Coverage */}
            <OfficesSection dictionary={dict.offices} />

            {/* Certifications */}
            {/* <section className="section-padding bg-[var(--color-bg)]">
                <div className="container-site">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
                            {dict.about.internationalSupport}
                        </span>
                        <h2 className="section-title mb-4">{dict.about.certificationsTitle}</h2>
                        <p className="section-subtitle mx-auto">
                            {dict.about.certificationsSubtitle}
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
                                            {dict.about.since.replace('{year}', cert.year.toString())}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white">
                <div className="container-site text-center">
                    <h2 className="text-3xl font-black mb-4">
                        {dict.about.moreInfo}
                    </h2>
                    <p className="text-blue-100 text-base mb-8 max-w-lg mx-auto">
                        {dict.about.moreInfoSubtitle}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href={`/${l}/productos`}
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[var(--color-primary)] font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-md hover:-translate-y-0.5"
                        >
                            {dict.about.viewCatalog}
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
