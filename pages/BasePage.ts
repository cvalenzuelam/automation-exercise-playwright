import { Page, Locator, expect } from '@playwright/test';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export class BasePage {
    readonly page: Page;
    readonly header: Header;
    readonly footer: Footer;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.footer = new Footer(page);
    }

    async goTo(url: string) {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async waitForElement(selector: string) {
        await this.page.waitForSelector(selector);
    }
}
