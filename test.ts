import { getProducts } from './lib/wordpress.ts';

async function test() {
    try {
        console.log("Fetching products...");
        const products = await getProducts();
        console.log("Success! Fetched", products.length, "products.");
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
