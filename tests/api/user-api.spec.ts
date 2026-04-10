import { test, expect } from '@playwright/test';
import { VALID_USER } from '../../data/user-data';

test.describe.serial('API: User authentication @api', () => {
    
    test('API 7: POST To Verify Login with valid details', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
            form: {
                email: VALID_USER.EMAIL,
                password: VALID_USER.PASSWORD
            }
        });

        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('User exists!');
    });

    test('API 8: POST To Verify Login with invalid details', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
            form: {
                email: 'nonexistent_user@example.com',
                password: 'wrongpassword'
            }
        });

        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        
        expect(body.responseCode).toBe(404);
        expect(body.message).toBe('User not found!');
    });

    test('API 9: DELETE To Verify Login (Unsupported Method)', async ({ request }) => {
        const response = await request.delete('/api/verifyLogin');

        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.');
    });

    test('API 10: POST To Verify Login without email parameter', async ({ request }) => {
        const response = await request.post('/api/verifyLogin', {
            form: {
                password: VALID_USER.PASSWORD
            }
        });

        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
    });
});
