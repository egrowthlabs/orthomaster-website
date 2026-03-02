// =============================================================
// Orthomaster — Configuración Central del Sitio
// Todos los datos institucionales se gestionan desde aquí.
// Los productos se obtienen dinámicamente de la API de WordPress.
// =============================================================

// ----------------------------------------------------------------
// Tipos / Interfaces
// ----------------------------------------------------------------

export interface Branch {
    name: string;
    address: string;
    city: string;
    state: string;
    phone?: string;
    mapsUrl: string;
    mapsEmbed?: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    label: string;
}

export interface Certification {
    name: string;
    issuer: string;
    year?: number;
    icon?: string;
}

export interface BrandingConfig {
    colors: {
        primary: string;
        primaryDark: string;
        primaryLight: string;
        secondary: string;
        accent: string;
        background: string;
        surface: string;
        text: string;
        textMuted: string;
        border: string;
        success: string;
        warning: string;
        error: string;
        whatsapp: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    logo: {
        light: string;
        dark: string;
        alt: string;
        width: number;
        height: number;
    };
}

// ----------------------------------------------------------------
// API Endpoint
// ----------------------------------------------------------------

export const API_ENDPOINT = 'https://javierh48.sg-host.com/wp-json/orthomaster/v1/productos';
export const CATEGORIES_ENDPOINT = 'https://javierh48.sg-host.com/wp-json/orthomaster/v1/categorias';

// ----------------------------------------------------------------
// Datos de la Empresa
// ----------------------------------------------------------------

export const ENTITY_DATA = {
    name: 'Orthomaster',
    legalName: 'Orthomaster S.A. de C.V.',
    tagline: 'Especialistas en Trauma y Ortopedia',
    subTagline: 'Equipamiento médico de precisión para profesionales de la salud',
    bio: `Orthomaster es una empresa mexicana líder en la distribución de equipamiento médico especializado en trauma, ortopedia y rehabilitación. Con más de 15 años de experiencia, proveemos a hospitales, clínicas y profesionales de la salud con productos de la más alta calidad, respaldados por certificaciones internacionales y soporte técnico especializado.`,
    mission: 'Proveer soluciones de equipamiento médico de excelencia que mejoren los resultados clínicos y la calidad de vida de los pacientes, apoyando a los profesionales de la salud con tecnología de vanguardia.',
    vision: 'Ser la empresa distribuidora de equipamiento médico más confiable de México, reconocida por nuestra calidad, servicio y compromiso con la innovación en salud.',
    founded: 2009,
    certifications: [
        {
            name: 'COFEPRIS',
            issuer: 'Comisión Federal para la Protección contra Riesgos Sanitarios',
            year: 2010,
        },
        {
            name: 'ISO 13485',
            issuer: 'Organización Internacional de Normalización',
            year: 2015,
        },
        {
            name: 'FDA',
            issuer: 'Food and Drug Administration',
            year: 2018,
        },
    ] as Certification[],
    values: [
        {
            title: 'Calidad',
            description: 'Productos certificados que cumplen los más altos estándares internacionales.',
            icon: 'shield-check',
        },
        {
            title: 'Precisión',
            description: 'Equipamiento de alta tecnología para procedimientos quirúrgicos de exactitud.',
            icon: 'target',
        },
        {
            title: 'Confianza',
            description: 'Respaldo técnico especializado y garantía de servicio post-venta.',
            icon: 'handshake',
        },
        {
            title: 'Innovación',
            description: 'Siempre a la vanguardia con los últimos avances en tecnología médica.',
            icon: 'zap',
        },
    ],
    stats: [
        { value: '+15', label: 'Años de Experiencia' },
        { value: '+500', label: 'Productos en Catálogo' },
        { value: '+200', label: 'Instituciones Atendidas' },
        { value: '+1,500', label: 'Cirujanos que confían en nosotros' },
    ],
    team: [
        {
            name: 'Dr. Carlos Mendoza',
            role: 'Director Médico',
            bio: 'Especialista en Traumatología y Ortopedia con 20 años de experiencia clínica.',
            image: '/assets/img/team-1.jpg',
        },
    ],
    offices: {
        title: 'OFICINAS PRINCIPALES',
        mapImage: '/assets/img/orthomaster_mapa_oficinas_principales.png',
        cities: [
            'MÉRIDA', 'CANCÚN', 'MONTERREY', 'MEXICALI', 'TORREÓN',
            'TAMPICO', 'SALTILLO', 'HERMOSILLO', 'TUXTLA GUTIÉRREZ'
        ],
        coverage: {
            percentage: 73,
            text: 'Podemos llegar al 73% de la población a través de nuestras oficinas y canales de distribución.'
        }
    }
} as const;

// ----------------------------------------------------------------
// Datos de Contacto
// ----------------------------------------------------------------

export const CONTACT_DATA = {
    whatsapp: {
        number: '5215500000000', // Formato internacional sin +
        display: '+52 55 0000-0000',
        urgencias: '5215500000001',
        defaultMessage: '¡Hola! Me interesa obtener información sobre los productos de Orthomaster.',
    },
    email: {
        ventas: 'ventas@orthomaster.com.mx',
        soporte: 'soporte@orthomaster.com.mx',
        general: 'contacto@orthomaster.com.mx',
    },
    phone: {
        main: '+52 55 0000-0000',
        toll_free: '800-000-0000',
    },
    branches: [
        {
            name: 'Oficina Central',
            address: 'Av. Insurgentes Sur 1234, Col. Del Valle',
            city: 'Ciudad de México',
            state: 'CDMX',
            phone: '+52 55 0000-0000',
            mapsUrl: 'https://maps.google.com/?q=Av.+Insurgentes+Sur+1234+CDMX',
            mapsEmbed: '',
        },
        {
            name: 'Sucursal Guadalajara',
            address: 'Av. López Mateos Norte 456, Col. Italia',
            city: 'Guadalajara',
            state: 'Jalisco',
            phone: '+52 33 0000-0000',
            mapsUrl: 'https://maps.google.com/?q=Lopez+Mateos+Norte+456+Guadalajara',
            mapsEmbed: '',
        },
    ] as Branch[],
    schedule: {
        weekdays: 'Lunes – Viernes: 9:00 AM – 6:00 PM',
        saturday: 'Sábado: 9:00 AM – 2:00 PM',
        sunday: 'Domingo: Cerrado',
        urgencias: 'Urgencias 24/7 por WhatsApp',
    },
    social: [
        {
            platform: 'instagram',
            url: 'https://www.instagram.com/orthomaster.mx',
            label: 'Instagram Orthomaster',
        },
        {
            platform: 'linkedin',
            url: 'https://www.linkedin.com/company/orthomaster',
            label: 'LinkedIn Orthomaster',
        },
    ] as SocialLink[],
} as const;

// ----------------------------------------------------------------
// Branding
// ----------------------------------------------------------------

export const BRANDING: BrandingConfig = {
    colors: {
        primary: '#094068',        // Azul Corporativo
        primaryDark: '#052d4a',    // Azul Oscuro (derivado)
        primaryLight: '#0d598f',   // Azul Claro (derivado)
        secondary: '#4A5568',      // Gris Técnico
        accent: '#81c754',         // Verde Corporativo (usado como accent ahora)
        background: '#F8FAFC',     // Blanco Roto
        surface: '#FFFFFF',        // Blanco Puro
        text: '#1A202C',           // Negro Suave
        textMuted: '#718096',      // Gris Texto
        border: '#E2E8F0',         // Gris Borde
        success: '#81c754',        // Verde Corporativo
        warning: '#F39C12',        // Ámbar
        error: '#E74C3C',          // Rojo
        whatsapp: '#25D366',       // Verde WhatsApp oficial
    },
    fonts: {
        heading: 'Outfit',
        body: 'Outfit',
    },
    logo: {
        light: '/assets/img/logo-white.svg',
        dark: '/assets/img/logo-dark.svg',
        alt: 'Orthomaster - Especialistas en Trauma y Ortopedia',
        width: 180,
        height: 48,
    },
};

// ----------------------------------------------------------------
// Categorías de Productos a Mostrar en Configuración
// ----------------------------------------------------------------

export const DISPLAY_CATEGORIES = [
    'Sports Medicine',
    'Remplazo Articular',
    'Osteosíntesis',
    'Columna'
];

// ----------------------------------------------------------------
// Categorías de Productos (Fallback cuando la API no responde)
// ----------------------------------------------------------------

export const PRODUCT_CATEGORIES_FALLBACK = [
    {
        id: 1,
        name: 'Sports Medicine',
        slug: 'sports-medicine',
        description: 'Implantes y sistemas para medicina deportiva',
        image: '/assets/img/categorias/orthomaster_categoría_sports_medicine.jpeg',
        color: '#094068',
    },
    {
        id: 2,
        name: 'Remplazo Articular',
        slug: 'remplazo-articular',
        description: 'Prótesis articulares de alta precisión',
        image: '/assets/img/categorias/orthomaster_categoría_reemplazo_articular.jpeg',
        color: '#2980B9',
    },
    {
        id: 3,
        name: 'Osteosíntesis',
        slug: 'osteosintesis',
        description: 'Sistemas de fijación ósea avanzados',
        image: '/assets/img/categorias/orthomaster_categoría_osteosíntesis.jpg',
        color: '#81c754',
    },
    {
        id: 4,
        name: 'Columna',
        slug: 'columna',
        description: 'Soluciones integrales para patologías espinales',
        image: '/assets/img/categorias/orthomaster_categoría_columna.jpg',
        color: '#27AE60',
    },
];

// ----------------------------------------------------------------
// SEO Defaults
// ----------------------------------------------------------------

export const SEO_DEFAULTS = {
    siteName: 'Orthomaster',
    baseUrl: 'https://www.orthomaster.com.mx',
    defaultTitle: 'Orthomaster | Especialistas en Trauma y Ortopedia',
    defaultDescription:
        'Orthomaster, empresa líder en distribución de equipamiento médico especializado en trauma, ortopedia y rehabilitación en México. Productos certificados, entrega nacional.',
    ogImage: '/assets/img/og-image.jpg',
    twitterHandle: '@orthomaster_mx',
    locale: 'es_MX',
    keywords: [
        'ortopedia',
        'trauma',
        'equipamiento médico',
        'implantes ortopédicos',
        'instrumental quirúrgico',
        'México',
        'distribuidora médica',
    ],
};

// ----------------------------------------------------------------
// EmailJS
// ----------------------------------------------------------------

export const EMAILJS_CONFIG = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? 'YOUR_SERVICE_ID',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? 'YOUR_TEMPLATE_ID',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? 'YOUR_PUBLIC_KEY',
};
