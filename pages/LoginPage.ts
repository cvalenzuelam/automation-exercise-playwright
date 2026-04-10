import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    public readonly newUserSignupHeader: Locator;
    public readonly nameInput: Locator;
    public readonly signupEmailInput: Locator;
    public readonly signupButton: Locator;
    public readonly loginEmailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly errorMessageLogin: Locator;
    public readonly errorMessageSignup: Locator;

    constructor(page: Page) {
        super(page);
        this.newUserSignupHeader = page.getByRole('heading', { name: 'New User Signup!' })
        this.nameInput = page.getByRole('textbox', { name: 'Name' })
        this.signupEmailInput = page.locator("//input[@data-qa='signup-email']")
        this.signupButton = page.getByRole('button', { name: 'Signup' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.loginEmailInput = page.locator("//input[@data-qa='login-email']")
        this.errorMessageLogin = page.locator('form[action="/login"] p');
        this.errorMessageSignup = page.getByText('Email Address already exist!', { exact: true })

    }

    async fillSignupForm(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.signupEmailInput.fill(email);
    }

    async clickSignup() {
        await this.signupButton.click();
    }

    async verifyIsLoaded() {
        await expect(this.page).toHaveURL('/login');
        await expect(this.newUserSignupHeader).toBeVisible();
    }

    async fillLoginForm(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async verifyErrorMessage(expectedErrorMessage: string) {
        await expect(this.errorMessageLogin).toHaveText(expectedErrorMessage);
        await expect(this.errorMessageLogin).toBeVisible();
    }

    async verifyErrorMessageSignup(expectedErrorMessage: string) {
        await expect(this.errorMessageSignup).toHaveText(expectedErrorMessage);
        await expect(this.errorMessageSignup).toBeVisible();
    }
}