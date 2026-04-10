import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class PaymentPage extends BasePage {
    public readonly nameOnCard: Locator;
    public readonly cardNumber: Locator;
    public readonly cvc: Locator;
    public readonly expirationmonth: Locator;
    public readonly expirationyear: Locator;
    public readonly payButton: Locator;

    constructor(page: Page) {
        super(page);
        this.nameOnCard = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expirationmonth = page.locator('[data-qa="expiry-month"]');
        this.expirationyear = page.locator('[data-qa="expiry-year"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    }

    async verifyIsLoaded() {
        await expect(this.page).toHaveURL('/payment');
        await expect(this.nameOnCard).toBeVisible();
        await expect(this.cardNumber).toBeVisible();
        await expect(this.cvc).toBeVisible();
        await expect(this.expirationmonth).toBeVisible();
        await expect(this.expirationyear).toBeVisible();
    }

    async enterPaymentDetails(nameOnCard: string, cardNumber: string, cvc: string, expirationmonth: string, expirationyear: string) {
        await this.nameOnCard.fill(nameOnCard);
        await this.cardNumber.fill(cardNumber);
        await this.cvc.fill(cvc);
        await this.expirationmonth.fill(expirationmonth);
        await this.expirationyear.fill(expirationyear);
    }

    async clickPay() {
        await this.payButton.click();
    }
}