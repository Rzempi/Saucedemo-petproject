import { test } from '../../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';
import { checkoutDetails } from "../../test-data";

test.describe('Failed checkout tests', { tag: [ '@functional', '@regression', '@negative', '@checkout', '@ui' ] }, () => {

    test('No first name', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await expect(checkoutPage.lastNameField).toBeVisible();
            await checkoutPage.fillLastNameField(checkoutDetails.lastName);
            await expect(checkoutPage.lastNameField).toHaveValue(checkoutDetails.lastName);

            await expect(checkoutPage.zipPostalCodeField).toBeVisible();
            await checkoutPage.fillZipPostalCodeField(checkoutDetails.zipPostalCode);
            await expect(checkoutPage.zipPostalCodeField).toHaveValue(checkoutDetails.zipPostalCode);

            await expect(checkoutPage.continueButton).toBeVisible();
            await checkoutPage.clickContinueButton();
        });

        await expect(checkoutPage.errors.locator).toHaveText(checkoutPage.errors.firstNameErrorText)
    });

    test('No last name', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await expect(checkoutPage.firstNameField).toBeVisible();
            await checkoutPage.fillFirstNameField(checkoutDetails.firstName);
            await expect(checkoutPage.firstNameField).toHaveValue(checkoutDetails.firstName);

            await expect(checkoutPage.zipPostalCodeField).toBeVisible();
            await checkoutPage.fillZipPostalCodeField(checkoutDetails.zipPostalCode);
            await expect(checkoutPage.zipPostalCodeField).toHaveValue(checkoutDetails.zipPostalCode);

            await expect(checkoutPage.continueButton).toBeVisible();
            await checkoutPage.clickContinueButton();
        });

        await expect(checkoutPage.errors.locator).toHaveText(checkoutPage.errors.lastNameErrorText)
    });

    test('No zip/postal code', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await expect(checkoutPage.firstNameField).toBeVisible();
            await checkoutPage.fillFirstNameField(checkoutDetails.firstName);
            await expect(checkoutPage.firstNameField).toHaveValue(checkoutDetails.firstName);

            await expect(checkoutPage.lastNameField).toBeVisible();
            await checkoutPage.fillLastNameField(checkoutDetails.lastName);
            await expect(checkoutPage.lastNameField).toHaveValue(checkoutDetails.lastName);

            await expect(checkoutPage.continueButton).toBeVisible();
            await checkoutPage.clickContinueButton();
        });

        await expect(checkoutPage.errors.locator).toHaveText(checkoutPage.errors.zipPostalCodeErrorText)
    });
});