import {Page} from "@playwright/test";

export class CheckoutCompletePage {
    constructor(public page: Page) {}

    public completeHeader = this.page.locator('[data-test="complete-header"]');
    public completeText = this.page.locator('[data-test="complete-text"]');
    public backHomeButton = this.page.locator('[data-test="back-to-products"]');

    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }
}