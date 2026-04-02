import { test } from '../../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';

test('successful-checkout', { tag: [ '@functional', '@smoke', '@positive', '@e2e', '@ui' ] }, async ({ toCheckout, navbar, checkoutPage, checkoutOverviewPage, checkoutCompletePage  }) => {

    await expect(navbar.pageTitle).toHaveText('Checkout: Your Information');

    await test.step("Fill checkout form", async () => {
        await expect(checkoutPage.firstNameField).toBeVisible();
        await checkoutPage.fillFirstNameField("testFirstName");
        await expect(checkoutPage.firstNameField).toHaveValue("testFirstName");

        await expect(checkoutPage.lastNameField).toBeVisible();
        await checkoutPage.fillLastNameField("testLastName");
        await expect(checkoutPage.lastNameField).toHaveValue("testLastName");

        await expect(checkoutPage.zipPostalCodeField).toBeVisible();
        await checkoutPage.fillZipPostalCodeField("50-506");
        await expect(checkoutPage.zipPostalCodeField).toHaveValue("50-506");
    });

    await test.step("Continue to order overview", async () => {
        await expect(checkoutPage.continueButton).toBeVisible();
        await checkoutPage.clickContinueButton();
    });

    await expect(checkoutPage.errors.locator).toBeHidden();
    await expect(navbar.pageTitle).toHaveText('Checkout: Overview');

    await test.step("Finish the order", async () => {
        await checkoutOverviewPage.clickFinishButton();
    });

    await expect(navbar.pageTitle).toHaveText('Checkout: Complete!');
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});