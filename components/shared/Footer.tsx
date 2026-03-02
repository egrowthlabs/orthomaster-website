import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin,
    Shield, ArrowRight,
} from 'lucide-react';
import { ENTITY_DATA, CONTACT_DATA } from '@/app/config';

const quickLinks = [
    { href: '/productos', label: 'Catálogo de Productos' },
    { href: '/nosotros', label: 'Sobre Orthomaster' },
    { href: '/contacto', label: 'Contáctanos' },
    { href: '/productos?categoria=trauma', label: 'Trauma' },
    { href: '/productos?categoria=ortopedia', label: 'Ortopedia' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-primary-dark)] text-white">
            {/* Main footer */}
            <div className="container-site py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/assets/img/logo-orthomaster.png"
                                alt={`${ENTITY_DATA.name} Logo`}
                                width={200}
                                height={80}
                                className="h-16 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-blue-200/80 text-sm leading-relaxed mb-5">
                            {ENTITY_DATA.tagline}. Distribuidoras de equipamiento médico de alta calidad en México.
                        </p>
                        {/* Certifications */}
                        <div className="flex flex-wrap gap-2">
                            {ENTITY_DATA.certifications.map((cert) => (
                                <span
                                    key={cert.name}
                                    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-white/10 text-blue-100"
                                >
                                    <Shield size={10} />
                                    {cert.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-white text-base mb-5 uppercase tracking-wider">
                            Navegación
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

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-white text-base mb-5 uppercase tracking-wider">
                            Contacto
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
                                    href={`mailto:${CONTACT_DATA.email.ventas}`}
                                    className="flex items-start gap-3 text-blue-200/80 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    <Mail size={16} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                                    <span>{CONTACT_DATA.email.ventas}</span>
                                </a>
                            </li>
                            {CONTACT_DATA.branches.slice(0, 1).map((branch) => (
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
                            ))}
                            <li className="flex items-start gap-3 text-blue-200/80 text-sm">
                                <Clock size={16} className="shrink-0 mt-0.5 text-[var(--color-accent)]" />
                                <div>
                                    <p>{CONTACT_DATA.schedule.weekdays}</p>
                                    <p>{CONTACT_DATA.schedule.saturday}</p>
                                    <p className="text-[var(--color-accent)] font-semibold mt-0.5">{CONTACT_DATA.schedule.urgencias}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Social + WA */}
                    <div>
                        <h3 className="font-bold text-white text-base mb-5 uppercase tracking-wider">
                            Síguenos
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
                                        aria-label={social.label}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-blue-200 hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
                                    >
                                        {icons[social.platform]}
                                    </a>
                                );
                            })}
                        </div>

                        {/* WhatsApp urgencias CTA commented out per user request */}
                        {/* 
                        <a
                            href={`https://wa.me/${CONTACT_DATA.whatsapp.urgencias}?text=${encodeURIComponent('¡Hola! Requiero atención urgente sobre un producto de Orthomaster.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-3 bg-[var(--color-whatsapp)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--color-whatsapp-dark)] transition-all duration-300 w-full justify-center shadow-md"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Urgencias 24/7
                        </a> 
                        */}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300/70">
                    <p>
                        © {currentYear} {ENTITY_DATA.legalName}. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/aviso-privacidad" className="hover:text-white transition-colors duration-200">
                            Aviso de Privacidad
                        </Link>
                        <Link href="/terminos" className="hover:text-white transition-colors duration-200">
                            Términos y Condiciones
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
