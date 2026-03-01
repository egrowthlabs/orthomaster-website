'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { ENTITY_DATA, CONTACT_DATA } from '@/app/config';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/productos', label: 'Productos' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[var(--color-border)]'
                    : 'bg-white/80 backdrop-blur-sm'
                    }`}
            >
                <div className="container-site">
                    <nav className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0" aria-label="Orthomaster Inicio">
                            <Image
                                src="/assets/img/logo-orthomaster.png"
                                alt={`${ENTITY_DATA.name} Logo`}
                                width={200}
                                height={120}
                                className="h-[80px] w-auto object-contain"
                                priority
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <ul className="hidden md:flex items-center gap-1" role="navigation">
                            {navLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${isActive(href)
                                            ? 'text-[var(--color-primary)] bg-[rgba(26,82,118,0.08)]'
                                            : 'text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[rgba(26,82,118,0.05)]'
                                            }`}
                                    >
                                        {label}
                                        {isActive(href) && (
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[var(--color-primary)] rounded-full" />
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <a
                                href={`tel:${CONTACT_DATA.phone.main}`}
                                className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
                            >
                                <Phone size={16} />
                                <span>{CONTACT_DATA.phone.main}</span>
                            </a>
                            <a
                                href={`https://wa.me/${CONTACT_DATA.whatsapp.number}?text=${encodeURIComponent(CONTACT_DATA.whatsapp.defaultMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-whatsapp)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-whatsapp-dark)] transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-text)] hover:bg-gray-100 transition-colors duration-200 z-[101]"
                            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[99] md:hidden transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
                {/* Menu Panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--color-border)]">
                        <Image
                            src="/assets/img/logo-orthomaster.png"
                            alt={`${ENTITY_DATA.name} Logo`}
                            width={140}
                            height={48}
                            className="h-8 w-auto object-contain"
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Cerrar menú"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Links */}
                    <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200 ${isActive(href)
                                    ? 'bg-[rgba(26,82,118,0.1)] text-[var(--color-primary)]'
                                    : 'text-[var(--color-text)] hover:bg-gray-50 hover:text-[var(--color-primary)]'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile CTA */}
                    <div className="px-4 pb-6 flex flex-col gap-3">
                        <a
                            href={`tel:${CONTACT_DATA.phone.main}`}
                            className="flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-gray-50 transition-colors"
                        >
                            <Phone size={16} />
                            {CONTACT_DATA.phone.main}
                        </a>
                        <a
                            href={`https://wa.me/${CONTACT_DATA.whatsapp.number}?text=${encodeURIComponent(CONTACT_DATA.whatsapp.defaultMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-whatsapp)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--color-whatsapp-dark)] transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Urgencias WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
