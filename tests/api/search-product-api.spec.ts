import { test, expect } from '@playwright/test';

test.describe.serial('API: Search Product @api', () => {
    test('API 5: POST To Search Product', async ({ request }) => {
        const response = await request.post('/api/searchProduct', {
            form: {
                search_product: 'tshirt'
            }
        });

        // Verificar código de respuesta HTTP 200
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());

        // Verificar código de respuesta interno de la API
        expect(body.responseCode).toBe(200);

        // Verificar que la respuesta contenga la lista de productos buscados
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBeTruthy();
        expect(body.products.length).toBeGreaterThan(0);
    });

    test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
        const response = await request.post('/api/searchProduct');
        
        // Verificar código de respuesta HTTP 200
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());

        // Código de error 400 por falta de parámetro
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
    });
});
