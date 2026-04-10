import { test } from '../../fixtures/test-fixtures';
import { getRandomEmail } from '../../utils/data-generator';


test.describe('Automation Exercise - Products @products', () => {



    test('Verify All Products and product detail page @smoke', async ({ page, homePage, productsPage, productDetailsPage }) => {
        await test.step('Navigate to Products page', async () => {
            await homePage.header.clickProducts();
            await productsPage.verifyIsLoaded();
            // FALLO INTENCIONAL PARA CI
            await expect(page.getByText('ESTE TEXTO NO EXISTE - FALLO QA')).toBeVisible({ timeout: 5000 });
        });

        await test.step('Verify user is navigated to ALL PRODUCTS page successfully and products list is visible', async () => {
            await productsPage.verifyProductListIsVisible();
        });

        await test.step('Verify user is navigated to product detail page successfully', async () => {
            await productsPage.clickProduct(0);
            await productDetailsPage.verifyIsLoaded();
            await productDetailsPage.verifyProductDetailsAreVisible();
        });
    });

    test('Search Product @products', async ({ page, homePage, productsPage, productDetailsPage }) => {
        await test.step('Navigate to Products page', async () => {
            await homePage.header.clickProducts();
            await productsPage.verifyIsLoaded();
        });

        await test.step('Verify user is navigated to ALL PRODUCTS page successfully and products list is visible', async () => {
            await productsPage.verifyProductListIsVisible();
        });

        await test.step('Enter product name in search input and click search button', async () => {
            const firstProductName = await productsPage.getFirstProductName();
            await productsPage.searchProduct(firstProductName);
            await productsPage.verifySearchResultsHeaderIsVisible();
            await productsPage.verifySearchResults(firstProductName);
        });
    });

    test('Add Products in Cart', async ({ homePage, productsPage, viewCartPage, header }) => {
        let product1: { name: string, price: string };
        let product2: { name: string, price: string };

        await test.step('Click "Products" button', async () => {
            await homePage.header.clickProducts();
            await productsPage.verifyIsLoaded();
        });

        await test.step('Add first product to cart', async () => {
            product1 = await productsPage.getProductInfo(0);
            await productsPage.hoverOverProduct(0);
            await productsPage.clickAddToCartByIndex(0);
            await productsPage.clickContinueShopping();
        });

        await test.step('Add second product to cart', async () => {
            product2 = await productsPage.getProductInfo(1);
            await productsPage.hoverOverProduct(1);
            await productsPage.clickAddToCartByIndex(1);
            await productsPage.clickContinueShopping();
        });

        await test.step('Verify both products are added to Cart with correct details', async () => {
            await header.clickCart();
            await viewCartPage.verifyIsLoaded();
            await viewCartPage.verifyProductDetails(product1.name, product1.price, '1', product1.price);
            await viewCartPage.verifyProductDetails(product2.name, product2.price, '1', product2.price);
        });
    });

    test('Verify Product quantity in Cart', async ({ homePage, productsPage, viewCartPage, header }) => {
        let product1: { name: string, price: string };

        await test.step('Click "Products" button', async () => {
            await header.clickProducts();
            await productsPage.verifyIsLoaded();
        });

        await test.step('Add first product to cart', async () => {
            product1 = await productsPage.getProductInfo(0);
            await productsPage.hoverOverProduct(0);
            await productsPage.clickAddToCartByIndex(0);
            await productsPage.clickContinueShopping();
        });





    });

    test('Place Order: Register while Checkout', async ({ signUpPage, productsPage, viewCartPage, header, loginPage, accountCreatedPage, checkoutPage, paymentPage, paymentDonePage, deleteAccountPage }) => {
        const userName = 'Christopher Valenzuela';

        await test.step('Click "Products" button', async () => {
            await header.clickProducts();
            await productsPage.verifyIsLoaded();
        });

        await test.step('Add first product to cart', async () => {
            await productsPage.hoverOverProduct(0);
            await productsPage.clickAddToCartByIndex(0);
            await productsPage.clickContinueShopping();
        });

        await test.step('Verify both products are added to Cart with correct details', async () => {
            await header.clickCart();
            await viewCartPage.verifyIsLoaded();

        });
        await test.step('Click Proceed To Checkout', async () => {
            await viewCartPage.clickProceedToCheckout();
            await viewCartPage.clickRegisterLogin();

        });

        await test.step('Fill all details in Signup and create account', async () => {

            const email = getRandomEmail();
            await loginPage.verifyIsLoaded();
            await loginPage.fillSignupForm(userName, email);
            await loginPage.clickSignup();
            await signUpPage.verifyIsLoaded();
            await signUpPage.completeRegistration(userName, email);
            await accountCreatedPage.verifyIsLoaded();
            await accountCreatedPage.clickContinue();
        });

        await test.step('Verify Logged in as username at top', async () => {
            await header.verifyLoggedInAs(userName);
        });

        await test.step('Click "Products" button', async () => {
            await header.clickProducts();
            await productsPage.verifyIsLoaded();
        });

        await test.step('Click "Proceed To Checkout" button', async () => {
            await header.clickCart();
            await viewCartPage.verifyIsLoaded();
            await viewCartPage.clickProceedToCheckout();

        });

        await test.step('Verify Address Details and Review Your Order', async () => {
            await checkoutPage.verifyIsLoaded();

        });

        await test.step('Enter description in comment text area and click "Place Order"', async () => {
            await checkoutPage.enterComment('This is a test comment');
            await checkoutPage.clickPlaceOrder();
        });


        await test.step('Enter payment details: Name on Card, Card Number, CVC, Expiration date', async () => {
            const paymentDetails = {
                nameOnCard: 'Christopher Valenzuela',
                cardNumber: '1234567890123456',
                cvc: '123',
                expirationmonth: '12',
                expirationyear: '2025'
            };
            await paymentPage.verifyIsLoaded();
            await paymentPage.enterPaymentDetails(paymentDetails.nameOnCard, paymentDetails.cardNumber, paymentDetails.cvc, paymentDetails.expirationmonth, paymentDetails.expirationyear);
            await paymentPage.clickPay();
        });

        await test.step('Verify order is placed successfully', async () => {
            await paymentDonePage.verifyIsLoaded();
        });

        await test.step('Click "Delete Account" button', async () => {
            await header.clickDeleteAccount();
            await deleteAccountPage.verifyIsLoaded();
            await deleteAccountPage.clickContinue();
        });
    });
});
