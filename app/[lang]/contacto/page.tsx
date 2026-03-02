import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    MapPin, Phone,
    Mail, Clock, ExternalLink,
} from 'lucide-react';
import { CONTACT_DATA } from '@/app/config';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';
import { ContactForm } from '@/components/sections/ContactForm';

interface ContactoPageProps {
    params: { lang: string };
}

export async function generateMetadata({ params }: ContactoPageProps): Promise<Metadata> {
    const { lang } = await params;
    const l = lang as Locale;
    const dict = await getDictionary(l);

    return {
        title: dict.contact.title,
        description: dict.contact.description,
    };
}

export default async function ContactoPage({ params }: ContactoPageProps) {
    const { lang } = await params;
    const l = lang as Locale;
    const dict = await getDictionary(l);

    return (
        <div className="bg-[var(--color-bg)]">
            {/* Header */}
            <section className="relative py-20 overflow-hidden bg-[var(--color-primary-dark)]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/img/orthomaster-10.jpeg"
                        alt={dict.contact.title}
                        fill
                        className="object-cover object-center opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary-dark)]/80 to-transparent" />
                </div>

                <div className="container-site relative z-10 text-white">
                    <nav className="flex items-center gap-2 text-sm text-blue-100/70 mb-8" aria-label="Breadcrumb">
                        <Link href={`/${l}`} className="hover:text-white transition-colors">{dict.common.home}</Link>
                        <span>/</span>
                        <span className="text-white font-medium">{dict.contact.title}</span>
                    </nav>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4 block">
                        {dict.contact.subtitle}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight">
                        {dict.contact.title}
                    </h1>
                    <p className="text-blue-50 text-xl max-w-2xl leading-relaxed">
                        {dict.contact.description}
                    </p>
                </div>
            </section>

            {/* Contact grid */}
            <section className="container-site py-14">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">

                    {/* Left: Contact Sidebar */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Phone & Email */}
                        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 flex flex-col gap-4 shadow-sm">
                            <a
                                href={`tel:${CONTACT_DATA.phone.main}`}
                                className="flex items-center gap-3 hover:text-[var(--color-primary)] transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-[rgba(9,64,104,0.08)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-200">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{dict.contact.sidebar.phone}</p>
                                    <p className="font-semibold text-sm">{CONTACT_DATA.phone.main}</p>
                                </div>
                            </a>

                            <a
                                href={`mailto:${CONTACT_DATA.email.ventas}`}
                                className="flex items-center gap-3 hover:text-[var(--color-primary)] transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-[rgba(9,64,104,0.08)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-200">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{dict.contact.sidebar.sales}</p>
                                    <p className="font-semibold text-sm">{CONTACT_DATA.email.ventas}</p>
                                </div>
                            </a>

                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[rgba(9,64,104,0.08)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{dict.contact.sidebar.schedule}</p>
                                    <p className="text-sm text-[var(--color-text-muted)]">{CONTACT_DATA.schedule.weekdays}</p>
                                    <p className="text-sm text-[var(--color-text-muted)]">{CONTACT_DATA.schedule.saturday}</p>
                                    <p className="text-sm font-semibold text-[var(--color-accent)] mt-0.5">{CONTACT_DATA.schedule.urgencias}</p>
                                </div>
                            </div>
                        </div>

                        {/* Branches */}
                        <div className="flex flex-col gap-4">
                            {CONTACT_DATA.branches.map((branch) => (
                                <div
                                    key={branch.name}
                                    className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[rgba(9,64,104,0.08)] flex items-center justify-center text-[var(--color-primary)] shrink-0 mt-0.5">
                                            <MapPin size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-[var(--color-text)]">{branch.name}</p>
                                            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{branch.address}</p>
                                            <p className="text-sm text-[var(--color-text-muted)]">{branch.city}, {branch.state}</p>
                                            <a
                                                href={branch.mapsUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] mt-2 hover:underline"
                                            >
                                                {dict.contact.sidebar.viewOnMaps}
                                                <ExternalLink size={10} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-3">
                        <ContactForm dictionary={dict.contact.form} lang={l} />
                    </div>
                </div>
            </section>
        </div>
    );
}
