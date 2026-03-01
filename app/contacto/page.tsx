'use client';

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
    Send, CheckCircle, AlertCircle, Loader2, MapPin, Phone,
    Mail, Clock, ExternalLink,
} from 'lucide-react';
import { CONTACT_DATA, EMAILJS_CONFIG } from '@/app/config';
import { Input, Textarea } from '@/components/ui/Input';

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

export default function ContactoPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!formData.name.trim()) newErrors.name = 'Por favor ingresa tu nombre.';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Ingresa un correo electrónico válido.';
        if (!formData.message.trim()) newErrors.message = 'Por favor escribe tu mensaje.';
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
            console.error('[ContactoPage] EmailJS error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-[var(--color-bg)]">
            {/* Header */}
            <section className="bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white py-16">
                <div className="container-site">
                    <nav className="flex items-center gap-2 text-sm text-blue-200/70 mb-6" aria-label="Breadcrumb">
                        <a href="/" className="hover:text-white transition-colors">Inicio</a>
                        <span>/</span>
                        <span className="text-white font-medium">Contacto</span>
                    </nav>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
                        Estamos para ayudarte
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                        Contáctanos
                    </h1>
                    <p className="text-blue-100 text-lg max-w-lg leading-relaxed">
                        Escríbenos con cualquier consulta sobre productos, disponibilidad, cotizaciones o soporte técnico.
                    </p>
                </div>
            </section>

            {/* Contact grid */}
            <section className="container-site py-14">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">

                    {/* Left: Contact Sidebar */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* WhatsApp urgent */}
                        <a
                            href={`https://wa.me/${CONTACT_DATA.whatsapp.urgencias}?text=${encodeURIComponent(CONTACT_DATA.whatsapp.defaultMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-4 p-5 bg-[#25D366] text-white rounded-2xl shadow-lg hover:bg-[#1DA851] transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                <svg viewBox="0 0 24 24" width="20" height="20" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-base">WhatsApp Urgencias 24/7</p>
                                <p className="text-white/80 text-sm">{CONTACT_DATA.whatsapp.display}</p>
                                <p className="text-white/70 text-xs mt-0.5">Respondemos en minutos</p>
                            </div>
                        </a>

                        {/* Phone */}
                        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 flex flex-col gap-4 shadow-sm">
                            <a
                                href={`tel:${CONTACT_DATA.phone.main}`}
                                className="flex items-center gap-3 hover:text-[var(--color-primary)] transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-[rgba(26,82,118,0.08)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-200">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Teléfono</p>
                                    <p className="font-semibold text-sm">{CONTACT_DATA.phone.main}</p>
                                </div>
                            </a>

                            <a
                                href={`mailto:${CONTACT_DATA.email.ventas}`}
                                className="flex items-center gap-3 hover:text-[var(--color-primary)] transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-xl bg-[rgba(26,82,118,0.08)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-200">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Ventas</p>
                                    <p className="font-semibold text-sm">{CONTACT_DATA.email.ventas}</p>
                                </div>
                            </a>

                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[rgba(26,82,118,0.08)] flex items-center justify-center text-[var(--color-primary)] shrink-0">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Horarios</p>
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
                                        <div className="w-9 h-9 rounded-xl bg-[rgba(26,82,118,0.08)] flex items-center justify-center text-[var(--color-primary)] shrink-0 mt-0.5">
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
                                                Ver en Maps
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
                        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">
                                Envíanos un mensaje
                            </h2>
                            <p className="text-[var(--color-text-muted)] text-sm mb-7">
                                Te responderemos en menos de 24 horas hábiles.
                            </p>

                            {/* Success State */}
                            {status === 'success' && (
                                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
                                    <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-green-800 text-sm">¡Mensaje enviado con éxito!</p>
                                        <p className="text-green-700 text-sm">Nos pondremos en contacto contigo a la brevedad.</p>
                                    </div>
                                </div>
                            )}

                            {/* Error State */}
                            {status === 'error' && (
                                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                                    <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-red-800 text-sm">Hubo un error al enviar tu mensaje.</p>
                                        <p className="text-red-700 text-sm">Por favor intenta de nuevo o contáctanos por WhatsApp.</p>
                                    </div>
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <Input
                                        label="Nombre completo"
                                        name="name"
                                        id="contact-name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                        placeholder="Dr. Juan García"
                                        required
                                        autoComplete="name"
                                    />
                                    <Input
                                        label="Teléfono"
                                        name="phone"
                                        id="contact-phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+52 55 0000-0000"
                                        autoComplete="tel"
                                    />
                                </div>

                                <Input
                                    label="Correo electrónico"
                                    name="email"
                                    id="contact-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    placeholder="doctor@hospital.com"
                                    required
                                    autoComplete="email"
                                />

                                <Input
                                    label="Asunto"
                                    name="subject"
                                    id="contact-subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Cotización de implantes para trauma, consulta de disponibilidad…"
                                />

                                <Textarea
                                    label="Mensaje"
                                    name="message"
                                    id="contact-message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    error={errors.message}
                                    placeholder="Escribe tu mensaje aquí. Incluye detalles del producto o consulta para una respuesta más rápida."
                                    required
                                    rows={5}
                                />

                                <div className="flex items-center justify-between gap-4 pt-1">
                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        Al enviar aceptas nuestro{' '}
                                        <a href="/aviso-privacidad" className="text-[var(--color-accent)] hover:underline">
                                            Aviso de Privacidad
                                        </a>.
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
                                                Enviando…
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Enviar Mensaje
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
