import { test } from '../src/fixtures/flowFixtures';
import { expect } from '@playwright/test';
import { users } from "../test-data";
import { LoginPage } from "../src/pages";

test.describe('Failed logins', {tag: [ '@functional', '@regression', '@negative', '@login', '@ui' ] }, async () => {

    test('Incorrect username', async ({ openedPage, loginPage }) => {

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField("TEST");
            await loginPage.fillPasswordField(users.standard.password);
            await loginPage.clickLoginButton();
        });

        expect(await loginPage.error.locator.innerText()).toBe(loginPage.error.failedLoginErrorText);
    });

    test('Incorrect password', async ({ openedPage, loginPage }) => {

        await test.step('Logging in', async () => {
            await loginPage.fillUsernameField(users.standard.username);
            await loginPage.fillPasswordField("TEST");
            await loginPage.clickLoginButton();
        });

        expect(await loginPage.error.locator.innerText()).toBe(loginPage.error.failedLoginErrorText);
    });
});