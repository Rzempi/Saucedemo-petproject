import {Page, Locator} from "@playwright/test";

export class ProductsPage {
    constructor(public page: Page) {}

    public addToCartButton(item: string): Locator {
        return this.page.locator(`[data-test="add-to-cart-${item.toLowerCase().replace(/ /g, '-')}"]` );
    }

    public removeButton(item: string): Locator {
        return this.page.locator(`[data-test="remove-${item.toLowerCase().replace(/ /g, '-')}"]`);
    }

    async clickAddToCartButton(item: string)  {
        await this.addToCartButton(item).click();
    }

    async clickRemoveButton(item: string) {
        await this.removeButton(item).click();
    }
}