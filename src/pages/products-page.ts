import {Page, Locator} from "@playwright/test";

export class ProductsPage {
    constructor(public page: Page) {}

    public shoppingCartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    public shoppingCartLink = this.page.locator('[data-test="shopping-cart-link"]');

    async clickShoppingCartLink() {
        await this.shoppingCartLink.click();
    }

    addToCartButton(item: string): Locator {
        return this.page.getByRole('button', { name: `add-to-cart-${item.toLowerCase().replace(/ /g, '-')}` });
    }

    removeButton(item: string): Locator {
        return this.page.getByRole('button', { name: `remove-${item.toLowerCase().replace(' ', '-')}` });
    }

    async clickAddToCartButton(item: string)  {
        await this.addToCartButton(item).click();
    }

    async clickRemoveButton(item: string) {
        await this.removeButton(item).click();
    }
}