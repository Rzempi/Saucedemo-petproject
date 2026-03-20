import { test, expect } from '@playwright/test';
import { users } from "../test-data";
import { LoginPage } from "../src/pages";

test.describe('Failed logins', {tag: [ '@functional', '@regression', '@negative', '@login', '@ui' ] }, async () => {

    test('Incorrect username', async ({page}) => {
        const loginPage = new LoginPage(page);

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField("TEST");
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        expect(await loginPage.error.locator.innerText()).toBe(loginPage.error.failedLoginErrorText);
    });

    test('Incorrect password', {tag: '@negative'}, async ({page}) => {
        const loginPage = new LoginPage(page);

        await test.step('Go to page', async () => {
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField("TEST");
            await loginPage.clickLoginButton();
        });

        expect(await loginPage.error.locator.innerText()).toBe(loginPage.error.failedLoginErrorText);
    });
});