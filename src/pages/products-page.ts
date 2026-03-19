import {Page, Locator} from "@playwright/test";
import { formatProductName } from '../utils/helpers';

export class ProductsPage {
    constructor(public page: Page) {}

    public itemNames = this.page.locator('[data-test="inventory-item-name"]');
    public itemPrices = this.page.locator('[data-test="inventory-item-price"]');

    public addToCartButton(item: string): Locator {
        return this.page.locator(`[data-test="add-to-cart-${formatProductName(item)}"]` );
    }

    public removeButton(item: string): Locator {
        return this.page.locator(`[data-test="remove-${formatProductName(item)}"]`);
    }

    async clickAddToCartButton(item: string)  {
        await this.addToCartButton(item).click();
    }

    async clickRemoveButton(item: string) {
        await this.removeButton(item).click();
    }
}