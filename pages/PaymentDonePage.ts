import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class PaymentDonePage extends BasePage {
    public readonly paymentDoneHeader: Locator;
    public readonly successMessage: Locator;
    public readonly downloadInvoice: Locator;

    constructor(page: Page) {
        super(page);
        this.paymentDoneHeader = page.locator('[data-qa="order-placed"]');
        this.successMessage = page.locator('p[style="font-size: 20px; font-family: garamond;"]');
        this.downloadInvoice = page.locator('a[href="/download_invoice/500"]');
    }

    async verifyIsLoaded() {
        await expect(this.paymentDoneHeader).toBeVisible();
        await expect(this.successMessage).toBeVisible();
        await expect(this.downloadInvoice).toBeVisible();
        await expect(this.page).toHaveURL(/payment_done/);
    }

    async clickDownloadInvoice() {
        await this.downloadInvoice.click();
    }
}