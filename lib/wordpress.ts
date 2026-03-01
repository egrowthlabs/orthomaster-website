// lib/wordpress.ts — Data fetching layer with ISR
// Consumes the Orthomaster custom WP REST API endpoint

import type { WPProduct, WPCategory, WPProductsResponse } from '@/types/wordpress';
import { API_ENDPOINT, DISPLAY_CATEGORIES } from '@/app/config';

const REVALIDATE_PRODUCTS = 3600;   // 1 hour
const REVALIDATE_CATEGORIES = 86400; // 24 hours

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------

function buildUrl(base: string, params?: Record<string, string>): string {
    const url = new URL(base);
    if (params) {
        Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val));
    }
    return url.toString();
}

async function fetchWP<T>(url: string, revalidate: number): Promise<T | null> {
    try {
        const response = await fetch(url, {
            next: { revalidate },
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`[wordpress.ts] API Error: ${response.status} ${response.statusText} — ${url}`);
            return null;
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error(`[wordpress.ts] Fetch failed for ${url}:`, error);
        return null;
    }
}

// ----------------------------------------------------------------
// getProducts — Fetches all products with optional category filter
// ----------------------------------------------------------------

export async function getProducts(category?: string): Promise<WPProduct[]> {
    const params: Record<string, string> = {};
    if (category) params.category = category;

    const url = buildUrl(API_ENDPOINT, Object.keys(params).length ? params : undefined);
    const data = await fetchWP<WPProductsResponse | WPProduct[]>(url, REVALIDATE_PRODUCTS);

    if (!data) return [];

    let products: WPProduct[] = [];

    // Handle both array response and { products: [] } response shape
    if (Array.isArray(data)) products = data;
    else if ('products' in data && Array.isArray(data.products)) products = data.products;

    // Strict filter: only return products that belong to at least one category in DISPLAY_CATEGORIES
    // We map both product category names and DISPLAY_CATEGORIES to lowercase for safer comparison.
    // We also overwrite product.categories to ONLY contain the allowed categories with exact casing.
    const allowedCategoriesLower = DISPLAY_CATEGORIES.map(c => c.toLowerCase().trim());

    return products.reduce<WPProduct[]>((acc, product) => {
        if (!product.categories) return acc;

        let rawCats = product.categories;
        if (typeof rawCats === 'string') {
            rawCats = [rawCats];
        } else if (!Array.isArray(rawCats)) {
            return acc; // invalid categories format
        }

        if (rawCats.length === 0) return acc;

        const validProductCats = rawCats.map(cat => {
            if (typeof cat !== 'string') return null;
            const normalized = cat.toLowerCase().trim();
            const index = allowedCategoriesLower.indexOf(normalized);
            if (index !== -1) {
                return DISPLAY_CATEGORIES[index]; // Use exact case from config
            }
            return null;
        }).filter(Boolean) as string[];

        if (validProductCats.length > 0) {
            acc.push({ ...product, categories: validProductCats });
        }
        return acc;
    }, []);
}

// ----------------------------------------------------------------
// getProductBySlug — Fetches a single product by its slug
// ----------------------------------------------------------------

export async function getProductBySlug(slug: string): Promise<WPProduct | null> {
    const url = buildUrl(API_ENDPOINT, { slug });
    const data = await fetchWP<WPProduct | WPProduct[]>(url, REVALIDATE_PRODUCTS);

    if (!data) return null;

    let product: WPProduct | null = null;
    // If the API returns an array, pick the first match
    if (Array.isArray(data)) {
        product = data.find((p) => p.slug === slug) ?? null;
    } else {
        product = data as WPProduct;
    }

    if (!product) return null;

    let rawCats = product.categories;
    if (typeof rawCats === 'string') {
        rawCats = [rawCats];
    } else if (!Array.isArray(rawCats)) {
        return null; // invalid categories format
    }

    if (rawCats.length === 0) return null;

    const allowedCategoriesLower = DISPLAY_CATEGORIES.map(c => c.toLowerCase().trim());
    const validProductCats = rawCats.map(cat => {
        if (typeof cat !== 'string') return null;
        const normalized = cat.toLowerCase().trim();
        const index = allowedCategoriesLower.indexOf(normalized);
        if (index !== -1) return DISPLAY_CATEGORIES[index]; // Use exact case from config
        return null;
    }).filter(Boolean) as string[];

    if (validProductCats.length === 0) return null;

    return { ...product, categories: validProductCats };
}

// ----------------------------------------------------------------
// getCategories — Fetches all product categories
// ----------------------------------------------------------------

export async function getCategories(): Promise<WPCategory[]> {
    const categoriesUrl = 'https://www.orthomaster.com.mx/wp-json/orthomaster/v1/categorias';
    const data = await fetchWP<WPCategory[]>(categoriesUrl, REVALIDATE_CATEGORIES);
    return data ?? [];
}

// ----------------------------------------------------------------
// generateProductStaticParams — For use in generateStaticParams()
// ----------------------------------------------------------------

export async function getProductSlugs(): Promise<string[]> {
    const products = await getProducts();
    return products.map((p) => p.slug);
}

// ----------------------------------------------------------------
// Helper: Build WhatsApp cotizar URL
// ----------------------------------------------------------------

export function buildWhatsAppQuoteUrl(phone: string, productName: string): string {
    const message = encodeURIComponent(
        `¡Hola! Me interesa cotizar el siguiente producto de Orthomaster:\n\n*${productName}*\n\n¿Podrían proporcionarme más información y disponibilidad?`
    );
    return `https://wa.me/${phone}?text=${message}`;
}
