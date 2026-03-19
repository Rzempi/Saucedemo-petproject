import {Page} from "@playwright/test";

export class Navbar {
    constructor(public page: Page) {}

    public pageTitle = this.page.locator('[data-test="title"]');

    public filterDropdown = this.page.locator('[data-test="product-sort-container"]');

    public shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    public shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }
}