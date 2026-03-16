import {Page} from "@playwright/test";

export class Navbar {
    constructor(public page: Page) {}

    public pageTitle = this.page.locator('[data-test="title"]');

    public shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    public shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }
}