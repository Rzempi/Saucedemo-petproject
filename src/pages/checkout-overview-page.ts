import {Page} from "@playwright/test";

export class CheckoutOverviewPage {
    constructor(public page: Page) {}

    public finishButton = this.page.locator('[data-test="finish"]');
    public cancelButton = this.page.locator('[data-test="cancel"]');

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async clickCancelButton(){
        await this.cancelButton.click();
    }
}