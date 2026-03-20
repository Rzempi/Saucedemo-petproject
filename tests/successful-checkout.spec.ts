import { test, expect } from '@playwright/test';
import { users, products } from "../test-data";
import { Navbar } from "../src/components";
import { LoginPage, ProductsPage, YourCartPage, CheckoutPage, CheckoutOverviewPage, CheckoutCompletePage } from "../src/pages";
import { getArrayOfBooleans } from "../src/utils";

test('test', { tag: [ '@functional', '@smoke', '@positive', '@e2e', '@ui' ] }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navbar = new Navbar(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);
    const yourCartPage = new YourCartPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    const numberOfProducts = Object.keys(products).length;
    // Generating which products will be added to cart in this test
    const orderedProducts = getArrayOfBooleans(numberOfProducts);
    // Count number of products, that will be ordered in this test
    const countOfProducts = orderedProducts.filter(Boolean).length

    await test.step('Go to page', async () => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Logging in', async () => {
        await loginPage.fillUsernameField(users.standard.username);
        await loginPage.fillPasswordField(users.standard.password);
        await loginPage.clickLoginButton();
    });

    await expect(navbar.pageTitle).toHaveText('Products')

    await test.step('Adding random products to the cart', async () => {
        for (let i = 0; i < numberOfProducts; i++)
        {
            if (orderedProducts[i]) {
                await productsPage.clickAddToCartButton(Object.values(products)[i]);
            }
        }
    });

    await expect(navbar.shoppingCartBadge).toHaveText(countOfProducts.toString());

    await test.step('Continue to Your Cart', async () => {
        await navbar.clickShoppingCartLink();
    });

    await expect(navbar.pageTitle).toHaveText('Your Cart')

    await test.step('Continue to checkout', async () => {
        await yourCartPage.clickCheckoutButton();
    });

    await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

    await test.step('Continue to order overview', async () => {
        await checkoutPage.fillFirstNameField("testFirstName");
        await checkoutPage.fillLastNameField("testLastName");
        await checkoutPage.fillZipPostalCodeField("50-506");
        await checkoutPage.clickContinueButton();
    });

    await expect(navbar.pageTitle).toHaveText('Checkout: Overview')

    await test.step('Finish the order', async () => {
        await checkoutOverviewPage.clickFinishButton();
    });

    await expect(navbar.pageTitle).toHaveText('Checkout: Complete!')
    await expect(checkoutCompletePage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutCompletePage.completeText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});