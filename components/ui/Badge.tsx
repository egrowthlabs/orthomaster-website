import React from 'react';

type BadgeVariant = 'primary' | 'accent' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    primary: 'bg-[rgba(9,64,104,0.1)] text-[#094068]',
    accent: 'bg-[rgba(129,199,84,0.1)] text-[#81c754]',
    secondary: 'bg-[rgba(74,85,104,0.1)] text-[#4A5568]',
    success: 'bg-[rgba(39,174,96,0.1)] text-[#27AE60]',
    warning: 'bg-[rgba(243,156,18,0.1)] text-[#F39C12]',
    error: 'bg-[rgba(231,76,60,0.1)] text-[#E74C3C]',
    neutral: 'bg-gray-100 text-gray-600',
};

export function Badge({ variant = 'primary', children, icon, className = '' }: BadgeProps) {
    return (
        <span
            className={`badge ${variantStyles[variant]} ${className}`}
        >
            {icon && <span className="shrink-0">{icon}</span>}
            {children}
        </span>
    );
}
