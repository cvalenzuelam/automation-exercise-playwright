import { test, expect } from '@playwright/test';

test.describe.serial('API: Brands @api', () => {
    test('API 3: Get All Brands List', async ({ request }) => {
        const response = await request.get('/api/brandsList');

        // Verificar código de respuesta HTTP 200
        expect(response.status()).toBe(200);

        const body = JSON.parse(await response.text());

        // Verificar código de respuesta interno de la API
        expect(body.responseCode).toBe(200);

        // Verificar que la respuesta contenga la lista de marcas
        expect(body).toHaveProperty('brands');
        expect(Array.isArray(body.brands)).toBeTruthy();
        expect(body.brands.length).toBeGreaterThan(0);

        // Verificar estructura de la primera marca
        const firstBrand = body.brands[0];
        expect(firstBrand).toHaveProperty('id');
        expect(firstBrand).toHaveProperty('brand');
    });

    test('API 4: PUT To All Brands List (Unsupported Method)', async ({ request }) => {
        const response = await request.put('/api/brandsList');
        const body = JSON.parse(await response.text());
        
        // Esta API devuelve 200 OK pero con un código de respuesta interno de 405
        expect(response.status()).toBe(200);
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });
});
