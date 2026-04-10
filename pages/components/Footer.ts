import { Page, Locator, expect } from '@playwright/test';

export class Footer {
    readonly page: Page;
    public readonly subscriptionHeader: Locator;
    public readonly emailInput: Locator;
    public readonly subscribeButton: Locator;
    public readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.subscriptionHeader = page.getByText('SUBSCRIPTION');
        this.emailInput = page.getByRole('textbox', { name: 'Your email address' });
        this.subscribeButton = page.locator('#subscribe');
        this.successMessage = page.getByText('You have been successfully subscribed!');
    }

    async scrollTo() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async subscribe(email: string) {
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }

    async verifySubscriptionHeaderVisible() {
        await expect(this.subscriptionHeader).toBeVisible();
    }

    async verifySuccessMessageVisible() {
        await expect(this.successMessage).toBeVisible();
    }
}
