import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async verifyIsLoaded() {
        await expect(this.page).toHaveURL('/');
        await this.header.verifyLogoIsVisible();
    }

    async verifyUserIsLoggedIn() {
        await expect(this.header.deleteAccountButton).toBeVisible();
        await expect(this.header.logoutButton).toBeVisible();
        await expect(this.page).toHaveURL('/');
    }

    async verifyUserIsLoggedOut() {
        await expect(this.header.deleteAccountButton).not.toBeVisible();
        await expect(this.header.signupLoginButton).toBeVisible();
    }

    // Keep home-specific methods here if any, 
    // but most are now in header/footer
}