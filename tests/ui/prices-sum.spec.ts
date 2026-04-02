import { test } from '../../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';
import { products } from "../../test-data";
import { getArrayOfBooleans, formatPrice } from "../../src/utils";

test('prices-sum', { tag: [ '@functional', '@regression', '@positive', '@checkout', '@ui' ] }, async (
    {
        loggedIn,
        navbar,
        productsPage,
        checkoutPage,
        yourCartPage,
        checkoutOverviewPage
    }) => {

    await expect(navbar.pageTitle).toHaveText('Products')

    let pricesSum = 0;

    // Generating which products will be added to cart in this test
    const numberOfProducts = Object.keys(products).length;
    const orderedProducts = getArrayOfBooleans(numberOfProducts);

    await test.step('Adding random products to the cart and summing up its prices', async () => {
        for (let i = 0; i < numberOfProducts; i++) {
            if (orderedProducts[i]) {
                await expect(productsPage.addToCartButton(Object.values(products)[i])).toBeVisible();
                await productsPage.clickAddToCartButton(Object.values(products)[i]);
                let itemPrice = formatPrice(await productsPage.itemPrices.nth(i).innerText());

                await expect(productsPage.addToCartButton(Object.values(products)[i])).toBeHidden();
                await expect(productsPage.removeButton(Object.values(products)[i])).toBeVisible();

                pricesSum+=itemPrice;
            }
        }
    });

    await expect(navbar.shoppingCartBadge).toContainText(orderedProducts.filter(Boolean).length.toString());

    await test.step('Continue to Your Cart', async () => {
        await expect(navbar.shoppingCartLink).toBeVisible();
        await navbar.clickShoppingCartLink();
    });

    await expect(navbar.pageTitle).toHaveText('Your Cart')

    await test.step('Continue to checkout', async () => {
        await expect(yourCartPage.checkoutButton).toBeVisible();
        await yourCartPage.clickCheckoutButton();
    });

    await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

    await test.step('Continue to order overview', async () => {
        await expect(checkoutPage.firstNameField).toBeVisible();
        await checkoutPage.fillFirstNameField("testFirstName");
        await expect(checkoutPage.firstNameField).toHaveValue("testFirstName");

        await expect(checkoutPage.lastNameField).toBeVisible();
        await checkoutPage.fillLastNameField("testLastName");
        await expect(checkoutPage.lastNameField).toHaveValue("testLastName");

        await expect(checkoutPage.zipPostalCodeField).toBeVisible();
        await checkoutPage.fillZipPostalCodeField("50-506");
        await expect(checkoutPage.zipPostalCodeField).toHaveValue("50-506");

        await expect(checkoutPage.continueButton).toBeVisible();
        await checkoutPage.clickContinueButton();
    });

    await expect(checkoutPage.errors.locator).toBeHidden();
    await expect(navbar.pageTitle).toHaveText('Checkout: Overview');

    pricesSum = +(pricesSum + pricesSum * 0.08).toFixed(2);
    expect(await checkoutOverviewPage.totalValue.innerText()).toContain(`${pricesSum}`);
})
