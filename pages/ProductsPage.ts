import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class ProductsPage extends BasePage {
    public readonly productsHeader: Locator;
    public readonly productListContainer: Locator;
    public readonly productItems: Locator;
    public readonly viewFirstProductButton: Locator;
    public readonly searchInput: Locator;
    public readonly searchButton: Locator;
    public readonly searchResultsHeader: Locator;
    public readonly addToCartFirstProductButton: Locator;
    public readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.productsHeader = page.getByRole('heading', { name: 'All Products' });
        this.productListContainer = page.locator('.features_items');
        // Cambiamos el locutor para que incluya todo el recuadro del producto (info + botón View Product)
        this.productItems = this.productListContainer.locator('.product-image-wrapper');
        this.viewFirstProductButton = page.locator('a').filter({ hasText: 'View Product' }).first();
        this.searchInput = page.getByRole('textbox', { name: 'Search Product' })
        this.searchButton = page.locator('#submit_search')
        this.searchResultsHeader = page.getByRole('heading', { name: 'Searched Products' })
        this.addToCartFirstProductButton = page.locator('a').filter({ hasText: 'Add to cart' }).first()
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' })
    }

    async verifyIsLoaded() {
        await expect(this.productsHeader).toBeVisible();
        await expect(this.page).toHaveURL('/products');
    }

    async verifyProductListIsVisible() {
        await expect(this.productListContainer).toBeVisible();
        const firstProduct = this.productItems.first();
        await expect(firstProduct).toBeVisible();
        // Estos elementos están dentro de .single-products, que a su vez está dentro de .product-image-wrapper
        await expect(firstProduct.locator('.productinfo img')).toBeVisible();
        await expect(firstProduct.locator('.productinfo h2')).toBeVisible();
        await expect(firstProduct.locator('.productinfo p')).not.toBeEmpty();
    }

    async getProductInfo(index: number) {
        const product = this.productItems.nth(index);
        const name = await product.locator('.productinfo p').innerText();
        const price = await product.locator('.productinfo h2').innerText();
        return { name, price };
    }

    async clickProduct(index: number) {
        // Ahora que el locutor es .product-image-wrapper, el botón "View Product" es accesible
        const viewProductBtn = this.productItems.nth(index).locator('a').filter({ hasText: 'View Product' });
        await viewProductBtn.scrollIntoViewIfNeeded();
        await viewProductBtn.click();
    }

    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async getFirstProductName(): Promise<string> {
        return await this.productItems.first().locator('.productinfo p').innerText();
    }

    async verifySearchResults(productName: string) {
        const resultsCount = await this.productItems.count();
        expect(resultsCount).toBeGreaterThan(0);
        await expect(this.productItems.first().locator('.productinfo p')).toContainText(productName);
    }

    async verifySearchResultsHeaderIsVisible() {
        await expect(this.searchResultsHeader).toBeVisible();
        await expect(this.page).toHaveURL(/search=/);
    }

    async hoverOverProduct(index: number) {
        await this.productItems.nth(index).hover();
    }

    async clickAddToCartByIndex(index: number) {
        // El botón "Add to cart" del overlay está dentro de .single-products, que está dentro de nuestro nuevo contenedor
        const cartButton = this.productItems.nth(index).locator('a.add-to-cart').nth(1);
        await cartButton.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

}
