import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
    public readonly deliveryAddress: Locator;
    public readonly billingAddress: Locator;
    public readonly comment: Locator;
    public readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryAddress = page.locator('#address_delivery');
        this.billingAddress = page.getByText('Your billing address');
        this.comment = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.locator('a[href="/payment"]');
    }

    async verifyIsLoaded() {
        await expect(this.page).toHaveURL('/checkout');
        await expect(this.deliveryAddress).toBeVisible();
        await expect(this.billingAddress).toBeVisible();
    }

    async enterComment(comment: string) {
        await this.comment.fill(comment);
    }

    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }
}
