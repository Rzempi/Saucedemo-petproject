import {Page} from "@playwright/test";

export class YourCartPage {
    constructor(public page: Page) {
    }

    public checkoutButton = this.page.locator('#checkout');
    public continueShoppingButton = this.page.locator('#continue-shopping');

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    };

    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click();
    };
}