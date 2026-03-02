'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '@/i18n.config';
import { Globe } from 'lucide-react';

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const pathname = usePathname();

    const redirectedPathname = (locale: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    return (
        <div className="flex items-center gap-2">
            <Globe size={16} className="text-[var(--color-text-muted)]" />
            <div className="flex items-center gap-1">
                {i18n.locales.map((locale) => (
                    <Link
                        key={locale}
                        href={redirectedPathname(locale)}
                        className={`text-xs font-bold px-2 py-1 rounded transition-colors ${currentLang === locale
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-gray-100'
                            }`}
                    >
                        {locale.toUpperCase()}
                    </Link>
                ))}
            </div>
        </div>
    );
}
