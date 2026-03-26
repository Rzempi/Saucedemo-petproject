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
    let pricesSum = 0;

    // Generating which products will be added to cart in this test
    const numberOfProducts = Object.keys(products).length;
    const orderedProducts = getArrayOfBooleans(numberOfProducts);

    await test.step('Adding random products to the cart and summing up its prices', async () => {
        for (let i = 0; i < numberOfProducts; i++) {
            if (orderedProducts[i]) {
                await productsPage.clickAddToCartButton(Object.values(products)[i]);
                let itemPrice = formatPrice(await productsPage.itemPrices.nth(i).innerText());

                pricesSum+=itemPrice;
            }
        }
    });

    await test.step('Continue to Your Cart', async () => {
        await navbar.clickShoppingCartLink();
    });

    await test.step('Continue to checkout', async () => {
        await yourCartPage.clickCheckoutButton();
    });

    await test.step('Continue to order overview', async () => {
        await checkoutPage.fillFirstNameField("testFirstName");
        await checkoutPage.fillLastNameField("testLastName");
        await checkoutPage.fillZipPostalCodeField("50-506");
        await checkoutPage.clickContinueButton();
    });

    pricesSum = +(pricesSum + pricesSum * 0.08).toFixed(2);
    expect(await checkoutOverviewPage.totalValue.innerText()).toContain(`${pricesSum}`);
})
