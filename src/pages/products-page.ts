import {Page, Locator} from "@playwright/test";
import { formatProductName } from '../utils/helpers';

export class ProductsPage {
    constructor(public page: Page) {}

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