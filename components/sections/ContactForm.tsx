'use client';

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
    Send, CheckCircle, AlertCircle, Loader2,
} from 'lucide-react';
import { EMAILJS_CONFIG } from '@/app/config';
import { Input, Textarea } from '@/components/ui/Input';

interface ContactFormProps {
    dictionary: {
        title: string;
        subtitle: string;
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        phone: string;
        phonePlaceholder: string;
        subject: string;
        subjectPlaceholder: string;
        message: string;
        messagePlaceholder: string;
        submit: string;
        sending: string;
        success: string;
        successFull: string;
        error: string;
        errorFull: string;
        privacyNotice: string;
        required: string;
    };
    lang: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}

const INITIAL_FORM: FormData = {
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
};

export function ContactForm({ dictionary, lang }: ContactFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!formData.name.trim()) newErrors.name = dictionary.required;
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = dictionary.emailPlaceholder;
        if (!formData.message.trim()) newErrors.message = dictionary.required;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('loading');
        try {
            await emailjs.sendForm(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                formRef.current!,
                EMAILJS_CONFIG.publicKey
            );
            setStatus('success');
            setFormData(INITIAL_FORM);
        } catch (error) {
            console.error('[ContactForm] EmailJS error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
                {dictionary.title}
            </h2>
            <p className="text-[var(--color-text-muted)] text-sm mb-7">
                {dictionary.subtitle}
            </p>

            {/* Success State */}
            {status === 'success' && (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
                    <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-green-800 text-sm">{dictionary.success}</p>
                        <p className="text-green-700 text-sm">{dictionary.successFull}</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {status === 'error' && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                    <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-red-800 text-sm">{dictionary.error}</p>
                        <p className="text-red-700 text-sm">{dictionary.errorFull}</p>
                    </div>
                </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                        label={dictionary.name}
                        name="name"
                        id="contact-name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder={dictionary.namePlaceholder}
                        required
                        autoComplete="name"
                    />
                    <Input
                        label={dictionary.phone}
                        name="phone"
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={dictionary.phonePlaceholder}
                        autoComplete="tel"
                    />
                </div>

                <Input
                    label={dictionary.email}
                    name="email"
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder={dictionary.emailPlaceholder}
                    required
                    autoComplete="email"
                />

                <Input
                    label={dictionary.subject}
                    name="subject"
                    id="contact-subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={dictionary.subjectPlaceholder}
                />

                <Textarea
                    label={dictionary.message}
                    name="message"
                    id="contact-message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    placeholder={dictionary.messagePlaceholder}
                    required
                    rows={5}
                />

                <div className="flex items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-[var(--color-text-muted)]">
                        {dictionary.privacyNotice.split('{link}')[0]}
                        <a href={`/${lang}/aviso-privacidad`} className="text-[var(--color-accent)] hover:underline">
                            {lang === 'es' ? 'Aviso de Privacidad' : 'Privacy Policy'}
                        </a>
                        {dictionary.privacyNotice.split('{link}')[1]}
                    </p>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        id="btn-submit-contacto"
                        className="inline-flex items-center gap-2 px-7 py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-dark)] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:pointer-events-none shrink-0"
                    >
                        {status === 'loading' ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                {dictionary.sending}
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                {dictionary.submit}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
