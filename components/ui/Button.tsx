'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    as?: 'button' | 'a';
    href?: string;
    target?: string;
    rel?: string;
    fullWidth?: boolean;
}

const styles: Record<ButtonVariant, string> = {
    primary:
        'bg-[#1A5276] text-white hover:bg-[#0F3460] active:scale-[0.98] shadow-md hover:shadow-lg',
    secondary:
        'bg-[#4A5568] text-white hover:bg-[#2D3748] active:scale-[0.98]',
    outline:
        'border-2 border-[#1A5276] text-[#1A5276] hover:bg-[#1A5276] hover:text-white active:scale-[0.98]',
    ghost:
        'text-[#1A5276] hover:bg-[rgba(26,82,118,0.08)] active:scale-[0.98]',
    whatsapp:
        'bg-[#25D366] text-white hover:bg-[#1DA851] active:scale-[0.98] shadow-md hover:shadow-lg',
    danger:
        'bg-[#E74C3C] text-white hover:bg-[#C0392B] active:scale-[0.98]',
};

const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-5 py-2.5 text-base rounded-lg gap-2',
    lg: 'px-7 py-3.5 text-lg rounded-xl gap-2.5',
};

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    as,
    href,
    target,
    rel,
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...rest
}: ButtonProps) {
    const base =
        'inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none';

    const classes = [
        base,
        styles[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const content = (
        <>
            {loading && (
                <svg
                    className="animate-spin h-4 w-4 text-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {!loading && icon && iconPosition === 'left' && icon}
            {children && <span>{children}</span>}
            {!loading && icon && iconPosition === 'right' && icon}
        </>
    );

    if (as === 'a' || href) {
        return (
            <a href={href} target={target} rel={rel} className={classes}>
                {content}
            </a>
        );
    }

    return (
        <button className={classes} disabled={disabled || loading} {...rest}>
            {content}
        </button>
    );
}
