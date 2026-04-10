import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TestCasesPage extends BasePage {
    public readonly testCasesHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.testCasesHeader = page.locator('b:has-text("TEST CASES")')
    }

    async verifyIsLoaded() {
        await expect(this.testCasesHeader).toBeVisible();
        await expect(this.page).toHaveURL('/test_cases');
    }
}