// =============================================================
// Orthomaster — WordPress REST API Type Definitions
// Endpoint: /wp-json/orthomaster/v1/productos
// =============================================================

export interface WPProductImage {
  id: number;
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  image?: string | null;
}

export interface WPProductAttribute {
  id: number;
  name: string;
  slug: string;
  options: string[];
  visible: boolean;
}

export interface WPProductDimensions {
  length?: string;
  width?: string;
  height?: string;
  weight?: string;
}

export interface WPProduct {
  id: number;
  title: string;
  slug: string;
  status: 'publish' | 'draft' | 'private' | 'pending';
  description: string;
  short_description: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  images: WPProductImage[];
  categories: string[];
  attributes: WPProductAttribute[];
  dimensions?: WPProductDimensions;
  featured?: boolean;
  date_created?: string;
  date_modified?: string;
  meta_data?: Array<{ key: string; value: string }>;
  // Custom fields from Orthomaster theme
  ficha_tecnica?: string;
  marca?: string;
  aplicaciones?: string[];
  materiales?: string;
  certificaciones?: string[];
}

export interface WPProductsResponse {
  products: WPProduct[];
  total: number;
  total_pages: number;
  current_page: number;
}

export interface WPApiError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}
