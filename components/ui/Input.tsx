'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    fullWidth?: boolean;
    rows?: number;
}

const baseInput =
    'block w-full px-4 py-2.5 text-[var(--color-text)] bg-white border border-[var(--color-border)] rounded-lg font-[family-name:var(--font-sans)] text-base placeholder-[var(--color-text-muted)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed';

export function Input({
    label,
    error,
    hint,
    icon,
    fullWidth = true,
    className = '',
    id,
    ...props
}: InputProps) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
            {label && (
                <label htmlFor={inputId} className="text-sm font-semibold text-[var(--color-text)]">
                    {label}
                    {props.required && <span className="text-[var(--color-error)] ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
                        {icon}
                    </span>
                )}
                <input
                    id={inputId}
                    className={`${baseInput} ${icon ? 'pl-10' : ''} ${error ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''
                        } ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-[var(--color-error)] font-medium">{error}</p>}
            {!error && hint && <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>}
        </div>
    );
}

export function Textarea({
    label,
    error,
    hint,
    fullWidth = true,
    rows = 4,
    className = '',
    id,
    ...props
}: TextareaProps) {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : ''}`}>
            {label && (
                <label htmlFor={textareaId} className="text-sm font-semibold text-[var(--color-text)]">
                    {label}
                    {props.required && <span className="text-[var(--color-error)] ml-1">*</span>}
                </label>
            )}
            <textarea
                id={textareaId}
                rows={rows}
                className={`${baseInput} resize-y min-h-[100px] ${error ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]' : ''
                    } ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-[var(--color-error)] font-medium">{error}</p>}
            {!error && hint && <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>}
        </div>
    );
}
