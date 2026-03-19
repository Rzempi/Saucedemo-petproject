import { test, expect } from '@playwright/test';
import { users, products, sortOptions } from "../test-data";
import { formatPrice } from "../src/utils";
import { Navbar } from "../src/components";
import { LoginPage, ProductsPage } from "../src/pages";

test.describe('Sorting verification', async () => {

    test('Sorting A to Z', { tag: '@positive' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const navbar = new Navbar(page);
        const productsPage = new ProductsPage(page);

        let sortedProducts = Object.values(products).sort();

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        await expect(navbar.pageTitle).toHaveText('Products')

        await test.step('Select sorting option', async () => {
            await navbar.filterDropdown.selectOption(sortOptions.nameAToZ.value);
        });

        for (let i=0; i<Object.keys(products).length; i++) {
            await expect(productsPage.itemNames.nth(i)).toHaveText(sortedProducts[i]);
        }
    });

    test('Sorting Z to A', { tag: '@positive' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const navbar = new Navbar(page);
        const productsPage = new ProductsPage(page);

        let sortedProducts = Object.values(products).sort().reverse();

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        await expect(navbar.pageTitle).toHaveText('Products')

        await test.step('Select sorting option', async () => {
            await navbar.filterDropdown.selectOption(sortOptions.nameZToA.value);
        });

        for (let i=0; i<Object.keys(products).length; i++) {
            await expect(productsPage.itemNames.nth(i)).toHaveText(sortedProducts[i]);
        }
    });

    test('Sorting by Price DESC', { tag: '@positive' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const navbar = new Navbar(page);
        const productsPage = new ProductsPage(page);

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        await expect(navbar.pageTitle).toHaveText('Products')

        await test.step('Select sorting option', async () => {
            await navbar.filterDropdown.selectOption(sortOptions.priceHighToLow.value);
        });

        for (let i=0; i<Object.keys(products).length-1; i++) {
            const currentPrice = formatPrice(await productsPage.itemPrices.nth(i).innerText());
            const nextPrice = formatPrice(await productsPage.itemPrices.nth(i+1).innerText());
            expect(currentPrice).toBeGreaterThanOrEqual(nextPrice);
        }
    });

    test('Sorting by Price ASC', { tag: '@positive' }, async ({ page }) => {
        const loginPage = new LoginPage(page);
        const navbar = new Navbar(page);
        const productsPage = new ProductsPage(page);

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        await expect(navbar.pageTitle).toHaveText('Products')

        await test.step('Select sorting option', async () => {
            await navbar.filterDropdown.selectOption(sortOptions.priceLowToHigh.value);
        });

        for (let i=0; i<Object.keys(products).length-1; i++) {
            const currentPrice = formatPrice(await productsPage.itemPrices.nth(i).innerText());
            const nextPrice = formatPrice(await productsPage.itemPrices.nth(i+1).innerText());
            expect(currentPrice).toBeLessThanOrEqual(nextPrice);
        }
    });
})