import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { DeleteAccountPage } from '../pages/DeleteAccountPage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { TestCasesPage } from '../pages/TestCasesPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { ViewCartPage } from '../pages/ViewCartPage';
import { Footer } from '../pages/components/Footer';
import { Header } from '../pages/components/Header';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { PaymentDonePage } from '../pages/PaymentDonePage';

interface TestFixtures {
    homePage: HomePage;
    loginPage: LoginPage;
    signUpPage: SignUpPage;
    accountCreatedPage: AccountCreatedPage;
    deleteAccountPage: DeleteAccountPage;
    contactUsPage: ContactUsPage;
    testCasesPage: TestCasesPage;
    productsPage: ProductsPage;
    productDetailsPage: ProductDetailsPage;
    viewCartPage: ViewCartPage;
    footer: Footer;
    header: Header;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage;
    paymentDonePage: PaymentDonePage;
}


export const test = base.extend<TestFixtures>({
    page: async ({ page }, use) => {
        // Bloquear dominios de publicidad para mejorar estabilidad y velocidad
        const adDomains = [
            '**/*googlesyndication*',
            '**/*google-analytics*',
            '**/*adservice.google*',
            '**/*doubleclick.net*',
            '**/*googleadservices*',
            '**/*google.com/ads*',
            '**/*tpc.googlesyndication.com*',
            '**/*pop-ads.js*',
            '**/*adnxs.com*',
            '**/*carbonads.net*',
            '**/*smartadserver*',
            '**/*crashlytics*'
        ];

        for (const domain of adDomains) {
            await page.route(domain, route => route.abort());
        }

        // BLOQUEO NIVEL 2: Sabotear scripts de anuncios antes de que carguen
        await page.addInitScript(() => {
            // Eliminar adsbygoogle para que no se ejecute nada
            (window as any).adsbygoogle = { push: () => { } };
            // Eliminar googletag (Common en DoubleClick)
            (window as any).googletag = { cmd: [], apiReady: true };
        });

        // BLOQUEO NIVEL 2: Ocultar elementos de anuncios via CSS para que no estorben visualmente ni capturen clic
        await page.addStyleTag({
            content: `
                #card, #dismiss-button, .adsbygoogle, #google_ads_iframe, 
                [id^="aswift_"], [id^="google_ads_iframe"], 
                #footer-ads, .vignette, .ad-unit { 
                    display: none !important; 
                    visibility: hidden !important; 
                    pointer-events: none !important; 
                    opacity: 0 !important;
                    height: 0 !important;
                    width: 0 !important;
                }
            `
        });

        await use(page);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await base.step('Open Home Page', async () => {
            await page.goto('/');
            await homePage.verifyIsLoaded();
        });
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    signUpPage: async ({ page }, use) => {
        await use(new SignUpPage(page));
    },
    accountCreatedPage: async ({ page }, use) => {
        await use(new AccountCreatedPage(page));
    },
    deleteAccountPage: async ({ page }, use) => {
        await use(new DeleteAccountPage(page));
    },
    contactUsPage: async ({ page }, use) => {
        await use(new ContactUsPage(page));
    },
    testCasesPage: async ({ page }, use) => {
        await use(new TestCasesPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    viewCartPage: async ({ page }, use) => {
        await use(new ViewCartPage(page));
    },
    footer: async ({ homePage }, use) => {
        await use(homePage.footer);
    },
    header: async ({ homePage }, use) => {
        await use(homePage.header);
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    paymentPage: async ({ page }, use) => {
        await use(new PaymentPage(page));
    },
    paymentDonePage: async ({ page }, use) => {
        await use(new PaymentDonePage(page));
    }
});

export { expect } from '@playwright/test';
