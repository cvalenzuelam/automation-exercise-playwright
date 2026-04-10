import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
    public readonly productDetailHeader: Locator;
    public readonly productName: Locator;
    public readonly productPrice: Locator;
    public readonly productDescription: Locator;
    public readonly productCategory: Locator;
    public readonly productAvailability: Locator;
    public readonly productCondition: Locator;
    public readonly productBrand: Locator;

    constructor(page: Page) {
        super(page);
        this.productDetailHeader = page.getByRole('heading', { name: 'Product Details' });
        this.productName = page.locator("div[class='product-information'] h2")
        this.productPrice = page.locator("div[class='product-information'] span span")
        this.productDescription = page.locator("div[class='product-information'] p:nth-child(3)")
        this.productCategory = page.locator('div.product-information').locator('p').nth(0)
        this.productAvailability = page.locator('div.product-information').locator('p').nth(1)
        this.productCondition = page.locator('div.product-information').locator('p').nth(2)
        this.productBrand = page.locator('div.product-information').locator('p').nth(3)
    }

    async verifyIsLoaded() {
        await expect(this.page).toHaveURL(/\/product_details\//);
    }

    async verifyProductDetailsAreVisible() {
        await expect(this.productName).not.toBeEmpty();
        await expect(this.productPrice).not.toBeEmpty();
        await expect(this.productDescription).not.toBeEmpty();
        await expect(this.productCategory).not.toBeEmpty();
        await expect(this.productAvailability).not.toBeEmpty();
        await expect(this.productCondition).not.toBeEmpty();
        await expect(this.productBrand).not.toBeEmpty();
    }

}