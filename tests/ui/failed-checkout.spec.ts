import { test } from '../../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';

test.describe('Failed checkout tests', { tag: [ '@functional', '@regression', '@negative', '@checkout', '@ui' ] }, () => {

    test('No first name', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await checkoutPage.fillLastNameField("testLastName");
            await checkoutPage.fillZipPostalCodeField("50-506");
            await checkoutPage.clickContinueButton();
        });

        expect(await checkoutPage.errors.locator.innerText()).toBe(checkoutPage.errors.firstNameErrorText)
    });

    test('No last name', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await checkoutPage.fillFirstNameField("testFirstName");
            await checkoutPage.fillZipPostalCodeField("50-506");
            await checkoutPage.clickContinueButton();
        });

        expect(await checkoutPage.errors.locator.innerText()).toBe(checkoutPage.errors.lastNameErrorText)
    });

    test('No zip/postal code', async ({ toCheckout, navbar, checkoutPage }) => {

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await checkoutPage.fillFirstNameField("testFirstName");
            await checkoutPage.fillLastNameField("testLastName");
            await checkoutPage.clickContinueButton();
        });

        expect(await checkoutPage.errors.locator.innerText()).toBe(checkoutPage.errors.zipPostalCodeErrorText)
    });
});