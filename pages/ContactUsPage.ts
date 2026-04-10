import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";
import path from 'path';

export class ContactUsPage extends BasePage {
    public readonly contactUsHeader: Locator;
    public readonly nameInput: Locator;
    public readonly emailInput: Locator;
    public readonly subjectInput: Locator;
    public readonly messageInput: Locator;
    public readonly uploadFile: Locator;
    public readonly submitButton: Locator;
    public readonly successMessage: Locator;
    public readonly feedbackEmail: Locator;
    public readonly subscriptionEmailInput: Locator;
    public readonly subscriptionSubmitButton: Locator;
    public readonly subscriptionSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.contactUsHeader = page.getByRole('heading', { name: 'Get In Touch' })
        this.nameInput = page.getByPlaceholder('Name', { exact: true })
        this.emailInput = page.getByPlaceholder('Email', { exact: true })
        this.subjectInput = page.getByPlaceholder('Subject', { exact: true })
        this.messageInput = page.getByPlaceholder('Your Message Here', { exact: true })
        this.uploadFile = page.locator('[name="upload_file"]')
        this.submitButton = page.locator('[name="submit"]')
        this.successMessage = page.locator('div.alert-success');
        this.feedbackEmail = page.getByText('feedback@automationexercise.com', { exact: true })
        this.subscriptionEmailInput = page.getByRole('textbox', { name: 'Your email address' })
        this.subscriptionSubmitButton = page.locator('#subscribe')
        this.subscriptionSuccessMessage = page.locator('div.alert-success');
    }

    async fillContactForm(name: string, email: string, subject: string, message: string) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async verifyIsLoaded() {
        await expect(this.contactUsHeader).toBeVisible();
        await expect(this.page).toHaveURL('/contact_us');
    }

    async verifySuccessMessage(expectedMessage: string) {
        await expect(this.successMessage).toHaveText(expectedMessage);
        await expect(this.successMessage).toBeVisible();
    }

    async uploadFileToForm(fileName: string = 'test-file.txt') {
        const filePath = path.resolve(__dirname, `../utils/${fileName}`);
        await this.uploadFile.setInputFiles(filePath);
    }

}