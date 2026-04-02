import { test } from '../../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';

test.describe('Failed checkout tests', { tag: [ '@functional', '@regression', '@negative', '@checkout', '@ui' ] }, () => {

    test('No first name', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await expect(checkoutPage.lastNameField).toBeVisible();
            await checkoutPage.fillLastNameField("testLastName");
            await expect(checkoutPage.lastNameField).toHaveValue("testLastName");

            await expect(checkoutPage.zipPostalCodeField).toBeVisible();
            await checkoutPage.fillZipPostalCodeField("50-506");
            await expect(checkoutPage.zipPostalCodeField).toHaveValue("50-506");

            await expect(checkoutPage.continueButton).toBeVisible();
            await checkoutPage.clickContinueButton();
        });

        await expect(checkoutPage.errors.locator).toHaveText(checkoutPage.errors.firstNameErrorText)
    });

    test('No last name', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await expect(checkoutPage.firstNameField).toBeVisible();
            await checkoutPage.fillFirstNameField("testFirstName");
            await expect(checkoutPage.firstNameField).toHaveValue("testFirstName");

            await expect(checkoutPage.zipPostalCodeField).toBeVisible();
            await checkoutPage.fillZipPostalCodeField("50-506");
            await expect(checkoutPage.zipPostalCodeField).toHaveValue("50-506");

            await expect(checkoutPage.continueButton).toBeVisible();
            await checkoutPage.clickContinueButton();
        });

        await expect(checkoutPage.errors.locator).toHaveText(checkoutPage.errors.lastNameErrorText)
    });

    test('No zip/postal code', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await expect(checkoutPage.firstNameField).toBeVisible();
            await checkoutPage.fillFirstNameField("testFirstName");
            await expect(checkoutPage.firstNameField).toHaveValue("testFirstName");

            await expect(checkoutPage.lastNameField).toBeVisible();
            await checkoutPage.fillLastNameField("testLastName");
            await expect(checkoutPage.lastNameField).toHaveValue("testLastName");

            await expect(checkoutPage.continueButton).toBeVisible();
            await checkoutPage.clickContinueButton();
        });

        await expect(checkoutPage.errors.locator).toHaveText(checkoutPage.errors.zipPostalCodeErrorText)
    });
});