import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Shield, ArrowRight,
} from 'lucide-react';
import { ENTITY_DATA, CONTACT_DATA } from '@/app/config';

interface FooterProps {
    lang: string;
    dictionary: {
        description: string;
        rights: string;
        developedBy: string;
        navigation: string;
        contact: string;
        followUs: string;
    };
}

export function Footer({ lang, dictionary }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: `/${lang}/productos`, label: lang === 'es' ? 'Catálogo de Productos' : 'Product Catalog' },
        { href: `/${lang}/nosotros`, label: lang === 'es' ? 'Sobre Orthomaster' : 'About Orthomaster' },
        { href: `/${lang}/contacto`, label: lang === 'es' ? 'Contáctanos' : 'Contact Us' },
    ];

    return (
        <footer className="bg-[var(--color-primary-dark)] text-white">
            <div className="container-site py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-1">
                        <Link href={`/${lang}`} className="inline-block mb-4">
                            <Image
                                src="/assets/img/logo-orthomaster.png"
                                alt={`${ENTITY_DATA.name} Logo`}
                                width={200}
                                height={80}
                                className="h-16 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-blue-200/80 text-sm leading-relaxed mb-5">
                            {ENTITY_DATA.tagline}.
                        </p>
                        {/* <div className="flex flex-wrap gap-2">
                            {ENTITY_DATA.certifications.map((cert) => (
                                <span
                                    key={cert.name}
                                    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-white/10 text-blue-100"
                                >
                                    <Shield size={10} />
                                    {cert.name}
                                </span>
                            ))}
                        </div> */}
                    </div>

                    <div>
                        <h3 className="font-bold text-white text-base mb-5 uppercase tracking-wider">
                            {dictionary.navigation}
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {quickLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="flex items-center gap-1.5 text-blue-200/80 hover:text-white transition-colors duration-200 text-sm group"
                                    >
                                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform duration-200" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white text-base mb-5 uppercase tracking-wider">
                            {dictionary.contact}
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <a
                                    href={`tel:${CONTACT_DATA.phone.main}`}
                                    className="flex items-start gap-3 text-blue-200/80 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    <Phone size={16} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                                    <span>{CONTACT_DATA.phone.main}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${CONTACT_DATA.email.general}`}
                                    className="flex items-start gap-3 text-blue-200/80 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    <Mail size={16} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                                    <span>{CONTACT_DATA.email.general}</span>
                                </a>
                            </li>
                            {/* {CONTACT_DATA.branches.slice(0, 1).map((branch) => (
                                <li key={branch.name}>
                                    <a
                                        href={branch.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-3 text-blue-200/80 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        <MapPin size={16} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                                        <span>{branch.address}, {branch.city}</span>
                                    </a>
                                </li>
                            ))} */}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white text-base mb-5 uppercase tracking-wider">
                            {dictionary.followUs}
                        </h3>
                        <div className="flex gap-3 mb-6">
                            {CONTACT_DATA.social.map((social) => {
                                const icons: Record<string, React.ReactNode> = {
                                    facebook: <Facebook size={18} />,
                                    instagram: <Instagram size={18} />,
                                    linkedin: <Linkedin size={18} />,
                                };
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-blue-200 hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
                                    >
                                        {icons[social.platform]}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300/70">
                    <p>© {currentYear} {ENTITY_DATA.legalName}. {dictionary.rights}</p>
                    <div className="flex items-center gap-4">
                        {/* <Link href={`/${lang}/aviso-privacidad`} className="hover:text-white transition-colors duration-200">
                            {lang === 'es' ? 'Aviso de Privacidad' : 'Privacy Policy'}
                        </Link>
                        <Link href={`/${lang}/terminos`} className="hover:text-white transition-colors duration-200">
                            {lang === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions'}
                        </Link> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
