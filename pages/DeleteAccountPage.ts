import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class DeleteAccountPage extends BasePage {
    public readonly accountDeletedHeader: Locator;
    public readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountDeletedHeader = page.locator('b:has-text("ACCOUNT DELETED!")')
        this.continueButton = page.getByRole('link', { name: 'Continue' })
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async verifyIsLoaded() {
        await expect(this.page).toHaveURL('/delete_account');
        await expect(this.accountDeletedHeader).toBeVisible();
    }

}