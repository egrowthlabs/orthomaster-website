'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { ENTITY_DATA, CONTACT_DATA } from '@/app/config';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
    lang: string;
    dictionary: {
        home: string;
        about: string;
        products: string;
        contact: string;
        quote: string;
    };
}

export function Navbar({ lang, dictionary }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: `/${lang}`, label: dictionary.home },
        { href: `/${lang}/productos`, label: dictionary.products },
        { href: `/${lang}/nosotros`, label: dictionary.about },
        { href: `/${lang}/contacto`, label: dictionary.contact },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [pathname]);

    const isActive = (href: string) => {
        if (href === `/${lang}`) return pathname === `/${lang}`;
        return pathname.startsWith(href);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[var(--color-border)]'
                : 'bg-white/80 backdrop-blur-sm'
                }`}
        >
            <div className="container-site">
                <nav className="flex items-center justify-between h-16 md:h-20">
                    <Link href={`/${lang}`} className="flex items-center shrink-0" aria-label="Orthomaster Inicio">
                        <Image
                            src="/assets/img/logo-orthomaster.png"
                            alt={`${ENTITY_DATA.name} Logo`}
                            width={200}
                            height={120}
                            className="h-[80px] w-auto object-contain"
                            priority
                        />
                    </Link>

                    <ul className="hidden md:flex items-center gap-1" role="navigation">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${isActive(href)
                                        ? 'text-[var(--color-primary)] bg-[rgba(9,64,104,0.08)]'
                                        : 'text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[rgba(9,64,104,0.05)]'
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

                    <div className="hidden md:flex items-center gap-6">
                        <LanguageSwitcher currentLang={lang} />
                        <div className="h-6 w-px bg-gray-200" />
                        <a
                            href={`tel:${CONTACT_DATA.phone.main}`}
                            className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
                        >
                            <Phone size={16} />
                            <span>{CONTACT_DATA.phone.main}</span>
                        </a>
                    </div>

                    <div className="flex items-center gap-3 md:hidden">
                        <LanguageSwitcher currentLang={lang} />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`flex items-center justify-center w-10 h-10 rounded-lg text-[var(--color-text)] hover:bg-gray-100 transition-colors duration-200 z-[101] ${isOpen ? 'invisible opacity-0' : 'visible opacity-100'}`}
                            aria-label={dictionary.home}
                            aria-expanded={isOpen}
                        >
                            <Menu size={26} />
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[99] md:hidden transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
            >
                {/* Backdrop / Click outside to close */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                {/* Sidebar Menu */}
                <div className={`absolute top-0 right-0 h-[100dvh] w-full max-w-sm bg-white/95 backdrop-blur-md shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--color-border)]">
                        <Image src="/assets/img/logo-orthomaster.png" alt={`${ENTITY_DATA.name} Logo`} width={180} height={60} className="h-10 w-auto object-contain" />
                        <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-lg text-[var(--color-text)] hover:bg-gray-100/50 transition-colors" aria-label="Cerrar">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-8">
                        <nav className="px-6 flex flex-col gap-2">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`px-4 py-4 rounded-xl text-lg font-bold transition-colors duration-200 ${isActive(href)
                                        ? 'bg-[rgba(129,199,84,0.1)] text-[var(--color-accent)]'
                                        : 'text-[var(--color-primary)] hover:bg-[rgba(129,199,84,0.05)] hover:text-[var(--color-accent)]'
                                        }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="px-6 pb-8 flex flex-col gap-4">
                        <a href={`tel:${CONTACT_DATA.phone.main}`} className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-[var(--color-primary)] rounded-xl text-base font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200">
                            <Phone size={18} />
                            {CONTACT_DATA.phone.main}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
