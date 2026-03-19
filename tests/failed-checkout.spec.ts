import { test, expect } from '@playwright/test';
import { users, products } from "../test-data";
import { Navbar } from "../src/components";
import { LoginPage, YourCartPage, CheckoutPage } from "../src/pages";

test.describe('Failed checkout tests', () => {

    test('No first name', { tag: '@negative' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const navbar = new Navbar(page);
        const yourCartPage = new YourCartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        await expect(navbar.pageTitle).toHaveText('Products')

        await test.step('Continue to Your Cart', async () => {
            await navbar.clickShoppingCartLink();
        });

        await expect(navbar.pageTitle).toHaveText('Your Cart')

        await test.step('Continue to checkout', async () => {
            await yourCartPage.clickCheckoutButton();
        });

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await checkoutPage.fillLastNameField("testLastName");
            await checkoutPage.fillZipPostalCodeField("50-506");
            await checkoutPage.clickContinueButton();
        });

        expect(await checkoutPage.errors.locator.innerText()).toBe(checkoutPage.errors.firstNameErrorText)
    });

    test('No last name', { tag: '@negative' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const navbar = new Navbar(page);
        const yourCartPage = new YourCartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        await expect(navbar.pageTitle).toHaveText('Products')

        await test.step('Continue to Your Cart', async () => {
            await navbar.clickShoppingCartLink();
        });

        await expect(navbar.pageTitle).toHaveText('Your Cart')

        await test.step('Continue to checkout', async () => {
            await yourCartPage.clickCheckoutButton();
        });

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await checkoutPage.fillFirstNameField("testFirstName");
            await checkoutPage.fillZipPostalCodeField("50-506");
            await checkoutPage.clickContinueButton();
        });

        expect(await checkoutPage.errors.locator.innerText()).toBe(checkoutPage.errors.lastNameErrorText)
    });

    test('No zip/postal code', { tag: '@negative' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const navbar = new Navbar(page);
        const yourCartPage = new YourCartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        await expect(navbar.pageTitle).toHaveText('Products')

        await test.step('Continue to Your Cart', async () => {
            await navbar.clickShoppingCartLink();
        });

        await expect(navbar.pageTitle).toHaveText('Your Cart')

        await test.step('Continue to checkout', async () => {
            await yourCartPage.clickCheckoutButton();
        });

        await expect(navbar.pageTitle).toHaveText('Checkout: Your Information')

        await test.step('Fill order details', async () => {
            await checkoutPage.fillFirstNameField("testFirstName");
            await checkoutPage.fillLastNameField("testLastName");
            await checkoutPage.clickContinueButton();
        });

        expect(await checkoutPage.errors.locator.innerText()).toBe(checkoutPage.errors.zipPostalCodeErrorText)
    });
});