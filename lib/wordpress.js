"use strict";
// lib/wordpress.ts — Data fetching layer with ISR
// Consumes the Orthomaster custom WP REST API endpoint
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
exports.getProductBySlug = getProductBySlug;
exports.getCategories = getCategories;
exports.getProductSlugs = getProductSlugs;
exports.buildWhatsAppQuoteUrl = buildWhatsAppQuoteUrl;
var config_1 = require("@/app/config");
var REVALIDATE_PRODUCTS = 300; // 5 minutes
var REVALIDATE_CATEGORIES = 300; // 5 minutes
// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
function buildUrl(base, params) {
    var url = new URL(base);
    if (params) {
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], val = _a[1];
            return url.searchParams.set(key, val);
        });
    }
    return url.toString();
}
function fetchWP(url, revalidate) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            next: { revalidate: revalidate },
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error("[wordpress.ts] API Error: ".concat(response.status, " ").concat(response.statusText, " \u2014 ").concat(url));
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, (_a.sent())];
                case 3:
                    error_1 = _a.sent();
                    console.error("[wordpress.ts] Fetch failed for ".concat(url, ":"), error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// ----------------------------------------------------------------
// getProducts — Fetches all products with optional category filter
// ----------------------------------------------------------------
function getProducts(category_1) {
    return __awaiter(this, arguments, void 0, function (category, lang) {
        var params, url, data, products, allowedCategoriesLower;
        if (lang === void 0) { lang = 'es'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {};
                    if (category)
                        params.category = category;
                    if (lang)
                        params.lang = lang;
                    url = buildUrl(config_1.API_ENDPOINT, Object.keys(params).length ? params : undefined);
                    return [4 /*yield*/, fetchWP(url, REVALIDATE_PRODUCTS)];
                case 1:
                    data = _a.sent();
                    if (!data)
                        return [2 /*return*/, []];
                    products = [];
                    // Handle both array response and { products: [] } response shape
                    if (Array.isArray(data))
                        products = data;
                    else if ('products' in data && Array.isArray(data.products))
                        products = data.products;
                    // Strict filter: only return products that belong to at least one category in DISPLAY_CATEGORIES
                    // We map both product category names and DISPLAY_CATEGORIES to lowercase for safer comparison.
                    // We also overwrite product.categories to ONLY contain the allowed categories with exact casing.
                    console.log('[DEBUG] DISPLAY_CATEGORIES is:', JSON.stringify(config_1.DISPLAY_CATEGORIES, null, 2));
                    allowedCategoriesLower = config_1.DISPLAY_CATEGORIES.map(function (c, i) {
                        console.log("[DEBUG] Mapping index ".concat(i, ", item:"), c);
                        return c.name.toLowerCase().trim();
                    });
                    return [2 /*return*/, products.reduce(function (acc, product) {
                            if (!product.categories)
                                return acc;
                            var rawCats = product.categories;
                            if (typeof rawCats === 'string') {
                                rawCats = [rawCats];
                            }
                            else if (!Array.isArray(rawCats)) {
                                return acc; // invalid categories format
                            }
                            if (rawCats.length === 0)
                                return acc;
                            var validProductCats = rawCats.map(function (cat) {
                                if (typeof cat !== 'string')
                                    return null;
                                var normalized = cat.toLowerCase().trim();
                                var index = allowedCategoriesLower.indexOf(normalized);
                                if (index !== -1) {
                                    return config_1.DISPLAY_CATEGORIES[index].name; // Use exact case from config
                                }
                                return null;
                            }).filter(Boolean);
                            if (validProductCats.length > 0) {
                                acc.push(__assign(__assign({}, product), { categories: validProductCats }));
                            }
                            return acc;
                        }, [])];
            }
        });
    });
}
// ----------------------------------------------------------------
// getProductBySlug — Fetches a single product by its slug
// ----------------------------------------------------------------
function getProductBySlug(slug_1) {
    return __awaiter(this, arguments, void 0, function (slug, lang) {
        var url, data, product, rawCats, allowedCategoriesLower, validProductCats;
        var _a;
        if (lang === void 0) { lang = 'es'; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = buildUrl(config_1.API_ENDPOINT, { slug: slug, lang: lang });
                    return [4 /*yield*/, fetchWP(url, REVALIDATE_PRODUCTS)];
                case 1:
                    data = _b.sent();
                    if (!data)
                        return [2 /*return*/, null];
                    product = null;
                    // If the API returns an array, pick the first match
                    if (Array.isArray(data)) {
                        product = (_a = data.find(function (p) { return p.slug === slug; })) !== null && _a !== void 0 ? _a : null;
                    }
                    else {
                        product = data;
                    }
                    if (!product)
                        return [2 /*return*/, null];
                    rawCats = product.categories;
                    if (typeof rawCats === 'string') {
                        rawCats = [rawCats];
                    }
                    else if (!Array.isArray(rawCats)) {
                        return [2 /*return*/, null]; // invalid categories format
                    }
                    if (rawCats.length === 0)
                        return [2 /*return*/, null];
                    console.log('[DEBUG-Slug] DISPLAY_CATEGORIES is:', JSON.stringify(config_1.DISPLAY_CATEGORIES, null, 2));
                    allowedCategoriesLower = config_1.DISPLAY_CATEGORIES.map(function (c, i) {
                        console.log("[DEBUG-Slug] Mapping index ".concat(i, ", item:"), c);
                        return c.name.toLowerCase().trim();
                    });
                    validProductCats = rawCats.map(function (cat) {
                        if (typeof cat !== 'string')
                            return null;
                        var normalized = cat.toLowerCase().trim();
                        var index = allowedCategoriesLower.indexOf(normalized);
                        if (index !== -1)
                            return config_1.DISPLAY_CATEGORIES[index].name; // Use exact case from config
                        return null;
                    }).filter(Boolean);
                    if (validProductCats.length === 0)
                        return [2 /*return*/, null];
                    return [2 /*return*/, __assign(__assign({}, product), { categories: validProductCats })];
            }
        });
    });
}
// ----------------------------------------------------------------
// getCategories — Fetches all product categories
// ----------------------------------------------------------------
function getCategories() {
    return __awaiter(this, arguments, void 0, function (lang) {
        var categoriesUrl, data;
        if (lang === void 0) { lang = 'es'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoriesUrl = buildUrl(config_1.CATEGORIES_ENDPOINT, { lang: lang });
                    return [4 /*yield*/, fetchWP(categoriesUrl, REVALIDATE_CATEGORIES)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data !== null && data !== void 0 ? data : []];
            }
        });
    });
}
// ----------------------------------------------------------------
// generateProductStaticParams — For use in generateStaticParams()
// ----------------------------------------------------------------
function getProductSlugs() {
    return __awaiter(this, arguments, void 0, function (lang) {
        var products;
        if (lang === void 0) { lang = 'es'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProducts(undefined, lang)];
                case 1:
                    products = _a.sent();
                    return [2 /*return*/, products.map(function (p) { return p.slug; })];
            }
        });
    });
}
// ----------------------------------------------------------------
// Helper: Build WhatsApp cotizar URL
// ----------------------------------------------------------------
function buildWhatsAppQuoteUrl(phone, productName) {
    var message = encodeURIComponent("\u00A1Hola! Me interesa cotizar el siguiente producto de Orthomaster:\n\n*".concat(productName, "*\n\n\u00BFPodr\u00EDan proporcionarme m\u00E1s informaci\u00F3n y disponibilidad?"));
    return "https://wa.me/".concat(phone, "?text=").concat(message);
}
