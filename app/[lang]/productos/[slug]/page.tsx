import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    MessageCircle, ChevronRight, Tag, Hash, CheckCircle,
    ArrowLeft, ArrowRight, Package,
} from 'lucide-react';
import { getProductBySlug, getProducts, getProductSlugs, buildWhatsAppQuoteUrl } from '@/lib/wordpress';
import { CONTACT_DATA, SEO_DEFAULTS, getLocalizedCategoryName } from '@/app/config';
import { Badge } from '@/components/ui/Badge';
import { ImageGallery } from './ImageGallery';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';

interface PageProps {
    params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
    const slugsEs = await getProductSlugs('es');
    const slugsEn = await getProductSlugs('en');

    return [
        ...slugsEs.map((slug) => ({ lang: 'es', slug })),
        ...slugsEn.map((slug) => ({ lang: 'en', slug })),
    ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { lang, slug } = await params;
    const l = lang as Locale;
    const dict = await getDictionary(l);
    const product = await getProductBySlug(slug, l);

    if (!product) {
        return {
            title: dict.products.noProductTitle,
            description: dict.products.noProductDescription,
        };
    }

    const mainImage = product.image;
    const plainDescription = product.short_description?.replace(/<[^>]+>/g, '') ?? '';

    return {
        title: product.title,
        description: plainDescription || `${product.title} — Orthomaster.`,
        openGraph: {
            title: `${product.title} | ${SEO_DEFAULTS.siteName}`,
            description: plainDescription,
            url: `${SEO_DEFAULTS.baseUrl}/${l}/productos/${slug}`,
            images: mainImage ? [{ url: mainImage, alt: product.title }] : [],
        },
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { lang, slug } = await params;
    const l = lang as Locale;
    const dict = await getDictionary(l);
    const product = await getProductBySlug(slug, l);

    if (!product) notFound();

    // Fetch products to find the next one in the same main category
    const mainCategory = product.categories?.[0];
    let nextProductSlug = null;
    let nextProductTitle = null;

    if (mainCategory) {
        const categoryProducts = await getProducts(mainCategory, l);
        const currentIndex = categoryProducts.findIndex(p => p.slug === product.slug);

        if (currentIndex !== -1 && currentIndex < categoryProducts.length - 1) {
            nextProductSlug = categoryProducts[currentIndex + 1].slug;
            nextProductTitle = categoryProducts[currentIndex + 1].title;
        } else if (categoryProducts.length > 1) {
            // Loop back to the first product if we're at the end
            nextProductSlug = categoryProducts[0].slug;
            nextProductTitle = categoryProducts[0].title;
        }
    } return (
        <div className="bg-[var(--color-bg)] min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-[var(--color-border)]">
                <div className="container-site py-3">
                    <nav className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]" aria-label="Breadcrumb">
                        <Link href={`/${l}`} className="hover:text-[var(--color-primary)] transition-colors">{dict.common.home}</Link>
                        <ChevronRight size={14} />
                        <Link href={`/${l}/productos`} className="hover:text-[var(--color-primary)] transition-colors">{dict.navbar.products}</Link>
                        {product.categories?.[0] && (
                            <>
                                <ChevronRight size={14} />
                                <Link
                                    href={`/${l}/productos?categoria=${encodeURIComponent(product.categories[0])}`}
                                    className="hover:text-[var(--color-primary)] transition-colors"
                                >
                                    {getLocalizedCategoryName(product.categories[0], l)}
                                </Link>
                            </>
                        )}
                        <ChevronRight size={14} />
                        <span className="text-[var(--color-text)] font-medium truncate max-w-[200px]">
                            {product.title}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Main product section */}
            <section className="container-site py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
                    {/* Left: Gallery */}
                    <div className="lg:sticky lg:top-32">
                        <ImageGallery image={product.image} title={product.title} />
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col gap-6">
                        {/* Categories */}
                        {product.categories && product.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {product.categories.map((catName) => (
                                    <Link key={catName} href={`/${l}/productos?categoria=${encodeURIComponent(catName)}`}>
                                        <Badge variant="accent">
                                            <Tag size={10} className="mr-0.5" />
                                            {getLocalizedCategoryName(catName, l)}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="font-black text-3xl md:text-4xl text-[var(--color-text)] leading-tight tracking-tight">
                            {product.title}
                        </h1>

                        {/* Marca */}
                        <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-muted)] -mt-2">
                            {product.marca && (
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-lg text-[var(--color-primary)] font-bold">
                                    <Package size={14} />
                                    <span>{product.marca}</span>
                                </span>
                            )}
                            {product.sku && (
                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg">
                                    <Hash size={13} />
                                    <span className="font-mono font-medium">{product.sku}</span>
                                </span>
                            )}
                        </div>

                        {/* Short Description (Fallback a Description) */}
                        {(product.short_description || product.description) && (
                            <div
                                className="text-[var(--color-text-muted)] text-base leading-relaxed prose prose-sm max-w-none mt-2 whitespace-pre-line prose-p:my-2 prose-ul:my-2"
                                dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
                            />
                        )}

                        {/* Attributes */}
                        {/* {product.attributes && product.attributes.length > 0 && (
                            <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
                                <div className="px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
                                    <h3 className="font-bold text-sm text-[var(--color-text)] uppercase tracking-wider">
                                        {dict.products.specifications}
                                    </h3>
                                </div>
                                <table className="w-full text-sm">
                                    <tbody>
                                        {product.attributes.map((attr, idx) => (
                                            <tr
                                                key={attr.id}
                                                className={idx % 2 === 0 ? 'bg-white' : 'bg-[var(--color-bg)]'}
                                            >
                                                <td className="px-4 py-2.5 font-semibold text-[var(--color-text)] w-1/3 border-r border-[var(--color-border)]">
                                                    {attr.name}
                                                </td>
                                                <td className="px-4 py-2.5 text-[var(--color-text-muted)]">
                                                    {attr.options.join(', ')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )} */}

                        {/* Certificaciones del producto */}
                        {product.certificaciones && product.certificaciones.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {product.certificaciones.map((cert) => (
                                    <span
                                        key={cert}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold"
                                    >
                                        <CheckCircle size={11} />
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* CTA Buttons (Ocultos por solicitud)
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Link
                                href={`/${l}/contacto?producto=${encodeURIComponent(product.title)}`}
                                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:brightness-110 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 text-base"
                                id="btn-cotizar-producto"
                            >
                                <MessageCircle size={20} />
                                {dict.products.quoteThis}
                            </Link>
                        </div>
                        */}

                        {/* Trust line */}
                        <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
                            <CheckCircle size={12} className="text-[var(--color-success)] shrink-0" />
                            {dict.products.certified}
                        </p>
                    </div>
                </div>
            </section>

            {/* Full Technical Description */}
            {/* {product.description && (
                <section className="bg-white border-t border-[var(--color-border)]">
                    <div className="container-site py-12">
                        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
                            {dict.products.technicalDescription}
                        </h2>
                        <div
                            className="prose prose-blue max-w-none text-[var(--color-text-muted)]
                prose-h2:font-bold prose-h2:text-[var(--color-text)]
                prose-h3:font-semibold prose-h3:text-[var(--color-text)]
                prose-ul:list-disc prose-ul:pl-4
                prose-li:my-1"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    </div>
                </section>
            )} */}

            {/* Ficha Técnica extra */}
            {/* {product.ficha_tecnica && (
                <section className="bg-[var(--color-bg)] border-t border-[var(--color-border)]">
                    <div className="container-site py-12">
                        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
                            {dict.products.technicalSheet}
                        </h2>
                        <div
                            className="prose prose-sm max-w-none text-[var(--color-text-muted)]"
                            dangerouslySetInnerHTML={{ __html: product.ficha_tecnica }}
                        />
                    </div>
                </section>
            )} */}

            {/* Back & Next links */}
            <div className="container-site py-8 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
                <Link
                    href={`/${l}/productos`}
                    className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm hover:underline"
                >
                    <ArrowLeft size={16} />
                    {dict.products.backToCatalog}
                </Link>

                {nextProductSlug && (
                    <Link
                        href={`/${l}/productos/${nextProductSlug}`}
                        className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm hover:underline text-right"
                        title={nextProductTitle || 'Siguiente producto'}
                    >
                        Siguiente producto
                        <ArrowRight size={16} />
                    </Link>
                )}
            </div>
        </div>
    );
}
