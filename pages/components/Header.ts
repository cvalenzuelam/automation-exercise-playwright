import { Page, Locator, expect } from '@playwright/test';

export class Header {
    readonly page: Page;
    public readonly logo: Locator;
    public readonly homeButton: Locator;
    public readonly productsButton: Locator;
    public readonly cartButton: Locator;
    public readonly signupLoginButton: Locator;
    public readonly testCasesButton: Locator;
    public readonly apiTestingButton: Locator;
    public readonly videoTutorialsButton: Locator;
    public readonly contactUsButton: Locator;
    public readonly logoutButton: Locator;
    public readonly deleteAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('img', { name: 'Website for automation practice' });
        this.homeButton = page.getByRole('link', { name: 'Home' });
        this.productsButton = page.getByRole('link', { name: ' Products' });
        this.cartButton = page.getByText('Cart', { exact: true })
        this.signupLoginButton = page.getByRole('link', { name: 'Signup / Login' });
        this.testCasesButton = page.locator("//a[contains(text(),'Test Cases')]");
        this.apiTestingButton = page.getByRole('link', { name: 'API Testing' });
        this.videoTutorialsButton = page.getByRole('link', { name: 'Video Tutorials' });
        this.contactUsButton = page.getByRole('link', { name: 'Contact Us' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
        this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
    }

    async verifyLoggedInAs(userName: string) {
        await expect(this.page.getByText(`Logged in as ${userName}`)).toBeVisible();
    }

    async clickSignupLogin() {
        await this.signupLoginButton.click();
    }

    async clickProducts() {
        await this.productsButton.click();
    }

    async clickCart() {
        await this.cartButton.click();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async clickDeleteAccount() {
        await this.deleteAccountButton.click();
    }

    async clickTestCases() {
        await this.testCasesButton.click();
    }

    async clickContactUs() {
        await this.contactUsButton.click();
    }

    async verifyLogoIsVisible() {
        await expect(this.logo).toBeVisible();
    }
}
