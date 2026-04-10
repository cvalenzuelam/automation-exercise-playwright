import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class ViewCartPage extends BasePage {
    public readonly cartTable: Locator;
    public readonly shoppingCartBreadcrumb: Locator;
    public readonly proceedToCheckoutButton: Locator;
    public readonly registerLoginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTable = page.locator('#cart_info_table');
        this.shoppingCartBreadcrumb = page.getByText('Shopping Cart');
        this.proceedToCheckoutButton = page.locator('a.btn.btn-default.check_out');
        this.registerLoginButton = page.getByText('Register / Login', { exact: true })
    }

    async verifyIsLoaded() {
        await expect(this.shoppingCartBreadcrumb).toBeVisible();
        await expect(this.cartTable).toBeVisible();
        await expect(this.proceedToCheckoutButton).toBeVisible();

    }

    async verifyProductDetails(name: string, price: string, quantity: string, total: string) {
        const row = this.page.locator('#cart_info_table tbody tr').filter({ hasText: name });
        await expect(row.locator('.cart_price')).toContainText(price);
        await expect(row.locator('.cart_quantity')).toContainText(quantity);
        await expect(row.locator('.cart_total')).toContainText(total);
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();

    }

    async clickRegisterLogin() {
        await this.registerLoginButton.click();
        await expect(this.page.getByText('Login to your account')).toBeVisible();
    }


}
