import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class AccountCreatedPage extends BasePage {
    public readonly accountCreatedHeader: Locator;
    public readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountCreatedHeader = page.locator('b:has-text("ACCOUNT CREATED!")')
        this.continueButton = page.getByRole('link', { name: 'Continue' })
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async verifyIsLoaded() {
        await expect(this.accountCreatedHeader).toBeVisible();
    }

}
