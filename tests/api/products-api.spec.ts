import { test, expect } from '@playwright/test';

test.describe('API: Products @api', () => {
    test('Get All Products List', async ({ request }) => {
        const response = await request.get('/api/productsList');

        // Verificar código de respuesta 200
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());

        // Verificar que la respuesta contenga la lista de productos
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBeTruthy();
        expect(body.products.length).toBeGreaterThan(0);

        // Verificar estructura básica de un producto para asegurar consistencia
        const firstProduct = body.products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('brand');
        expect(firstProduct).toHaveProperty('category');
    });

    test('POST To All Products List (Unsupported Method)', async ({ request }) => {
        const response = await request.post('/api/productsList');
        const body = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });


});
