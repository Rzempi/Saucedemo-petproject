import {Page} from "@playwright/test";

export class CheckoutPage {
    constructor(public page: Page) {}
    public firstNameField = this.page.getByPlaceholder('First Name');
    public lastNameField = this.page.getByPlaceholder('Last Name');
    public zipPostalCodeField = this.page.locator('[data-test="postalCode"]');
    public continueButton = this.page.locator('#continue');
    public cancelButton = this.page.locator('#cancel');

    public errors = {
        locator: this.page.locator('[data-test="error"]'),
        firstNameErrorText: "Error: First Name is required",
        lastNameErrorText: "Error: Last Name is required",
        zipPostalCodeErrorText: "Error: Postal Code is required"
    }
    
    async fillFirstNameField(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    async fillLastNameField(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async fillZipPostalCodeField(zipPostalCode: string) {
        await this.zipPostalCodeField.fill(zipPostalCode);
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }
}