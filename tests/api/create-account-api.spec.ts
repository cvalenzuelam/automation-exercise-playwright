import { test, expect } from '@playwright/test';
import { getRandomEmail, getRandomPassword, getRandomName } from '../../utils/data-generator';
import { VALID_USER } from '../../data/user-data';

test.describe.serial('API: Create and Delete Account @api', () => {
    
    // Almacenaremos las credenciales generadas para usarlas en el test de borrado
    const testUser = {
        name: getRandomName(),
        email: getRandomEmail(),
        password: getRandomPassword()
    };

    test('API 11: POST To Create/Register User Account', async ({ request }) => {
        const response = await request.post('/api/createAccount', {
            form: {
                name: testUser.name,
                email: testUser.email,
                password: testUser.password,
                title: 'Mr',
                birth_date: '10',
                birth_month: '12',
                birth_year: '1990',
                firstname: 'QA',
                lastname: 'Automation',
                company: 'QA Academy',
                address1: '123 Fake Street',
                address2: 'Apt 4B',
                country: 'United States',
                zipcode: '90210',
                state: 'California',
                city: 'Los Angeles',
                mobile_number: '1234567890'
            }
        });

        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        
        expect(body.responseCode).toBe(201);
        expect(body.message).toBe('User created!');
    });

    test('API 11: Error - POST To Create Account with existing email', async ({ request }) => {
        const response = await request.post('/api/createAccount', {
            form: {
                name: 'Existing User',
                email: VALID_USER.EMAIL, // Usamos el email que ya existe en el sistema
                password: 'password',
                title: 'Mr',
                birth_date: '1',
                birth_month: '1',
                birth_year: '2000',
                firstname: 'Test',
                lastname: 'User',
                company: 'Test Co',
                address1: 'Test St',
                address2: 'Test Apt',
                country: 'Canada',
                zipcode: 'A1A1A1',
                state: 'Ontario',
                city: 'Toronto',
                mobile_number: '0000000000'
            }
        });

        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        
        expect(body.responseCode).toBe(400);
        expect(body.message).toBe('Email already exists!');
    });

    test('API 13: PUT To Update User Account', async ({ request }) => {
        const response = await request.put('/api/updateAccount', {
            form: {
                name: testUser.name + ' Updated',
                email: testUser.email,
                password: testUser.password,
                title: 'Mr',
                birth_date: '15',
                birth_month: '05',
                birth_year: '1992',
                firstname: 'QA',
                lastname: 'Automation Updated',
                company: 'QA Academy Pro',
                address1: '456 New Street',
                address2: 'Suite 100',
                country: 'Canada',
                zipcode: 'M5V 2H1',
                state: 'Ontario',
                city: 'Toronto',
                mobile_number: '9876543210'
            }
        });

        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('User updated!');
    });

    test('API 12: DELETE To Delete User Account', async ({ request }) => {
        const response = await request.delete('/api/deleteAccount', {
            form: {
                email: testUser.email,
                password: testUser.password
            }
        });

        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        
        expect(body.responseCode).toBe(200);
        expect(body.message).toBe('Account deleted!');
    });
});
